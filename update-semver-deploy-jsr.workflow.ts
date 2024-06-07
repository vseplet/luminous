// deno-lint-ignore-file
import core from 'https://deno.land/x/shibui@v20/core/mod.ts';
// TYPES
import {
  ContextPot,
  CoreStartPot,
} from 'https://deno.land/x/shibui@v20/core/pots/mod.ts';
// UTILS
import { sh } from 'https://deno.land/x/shelly@v0.1.1/mod.ts';
import { walk } from 'jsr:@std/fs@0.224.0';
// HELPERS
import { incrementSemver } from 'https://deno.land/x/automation_scripts@0.0.5/ci-cd/helpers/mod.ts';
// SHARED TASKS
import { checkUpdateTypeByCommitMessage } from 'https://deno.land/x/automation_scripts@0.0.5/ci-cd/tasks/mod.ts';

class UpdateVersionContext extends ContextPot<{
  updateType: string;
  version: string;
}> {
  data = {
    denoJsonFilePath: './deno.json',
    versionsFilePath: './source/versions.ts',
    scope: Deno.args[0],
    packageName: Deno.args[1],
    updateType: 'patch',
    version: '0.0.0',
  };
}

core.api.register(
  core.workflow(UpdateVersionContext)
    .name('Update Version')
    .on(CoreStartPot)
    .sq(({ task1, shared1 }) => {
      const t6 = task1()
        .name('Publish to JSR')
        .do(async ({ log }) => {
          console.log(
            (await sh(`deno publish --allow-slow-types`)).stderr,
          );
          log.inf('test');
          Deno.exit(0);
        });

      const t5 = task1()
        .name('Create and push tag')
        .do(async ({ pots, log, next }) => {
          const ctx = pots[0].data;
          console.log((await sh(`git tag ${ctx.version}`)).stderr);
          console.log(
            (await sh(`git push origin ${ctx.version}`)).stderr,
          );

          log.inf(ctx.version);
          return next(t6);
        });

      const t4 = task1()
        .name('Commit and push changes')
        .do(async ({ pots, log, next }) => {
          const ctx = pots[0].data;
          console.log((await sh('git add -A')).stderr);
          console.log(
            (await sh(
              `git commit -m "Apply changes from update-version.ts script"`,
            )).stderr,
          );
          console.log((await sh('git push origin main')).stderr);

          log.inf(ctx.version);
          return next(t5);
        });

      const t3 = task1()
        .name('Update JSR imports in .md files')
        .do(async ({ pots, log, next }) => {
          const ctx = pots[0].data;

          const mdUrlPattern = new RegExp(
            String
              .raw`import\s+[^;]+from\s+'jsr:@${ctx.scope}\/${ctx.packageName}@[^']+';`,
            'g',
          );

          const mdUrlReplacePattern = new RegExp(
            String
              .raw`(@${ctx.scope}\/${ctx.packageName}@)[^']+`,
          );

          for await (
            const entry of walk('.', {
              exts: ['md'],
              skip: [/node_modules/, /build/, /.docusaurus/],
            })
          ) {
            if (entry.isFile) {
              const fileContent = await Deno.readTextFile(entry.path);
              const updatedContent = fileContent.replace(
                mdUrlPattern,
                (match) => {
                  return match.replace(
                    mdUrlReplacePattern,
                    `$1${ctx.version}`,
                  );
                },
              );

              if (fileContent !== updatedContent) {
                await Deno.writeTextFile(entry.path, updatedContent);
                log.trc(`file ${entry.path} updates.`);
              }
            }
          }

          log.inf(ctx.version);
          return next(t4);
        });

      const t2 = task1()
        .name('Update deno.json')
        .do(async ({ pots, log, next }) => {
          const ctx = pots[0].data;
          const denoJsonRaw = await Deno.readTextFile(
            ctx.denoJsonFilePath,
          );
          const json = JSON.parse(denoJsonRaw);

          if (json.version) {
            json.version = ctx.version;
            const newContent = JSON.stringify(json, null, 2);
            await Deno.writeTextFile(
              ctx.denoJsonFilePath,
              newContent,
            );
          }

          log.inf(ctx.version);
          return next(t3);
        });

      const t1 = task1()
        .name('Update versions.ts')
        .do(async ({ pots, log, next }) => {
          const ctx = pots[0].data;
          const oldVersionsTS = await Deno.readTextFile(
            ctx.versionsFilePath,
          );
          let newVersionsTS = '';
          const match = oldVersionsTS.match(
            /export default \[\s*([\s\S]*?)\s*\];/,
          );

          if (match && match[1]) {
            const versions = match[1]
              .split(',')
              .map((version) => version.trim().replace(/"/g, ''));

            ctx.version = incrementSemver(
              versions[0],
              ctx.updateType,
            );

            newVersionsTS = `export default [ ${
              [ctx.version, ...versions].map((version) =>
                `"${version}"`
              ).join(', ')
            } ];\n`;
          } else {
            newVersionsTS = `export default ["${ctx.version}"];`;
          }
          log.inf(ctx.version);
          await Deno.writeTextFile(
            ctx.versionsFilePath,
            newVersionsTS,
          );
          return next(t2, {
            version: ctx.version,
          });
        });

      const t0 = shared1(
        checkUpdateTypeByCommitMessage(UpdateVersionContext, t1),
      );

      const getScopeAndPackageName = task1()
        .name('GetScopeAndPackageName')
        .do(async ({ pots, log, next }) => {
          const ctx = pots[0].data;
          const json = JSON.parse(
            await Deno.readTextFile(ctx.denoJsonFilePath),
          );

          const match = json.name.match(/^@([^/]+)\/([^@]+)$/);
          const scope = match[1];
          const packageName = match[2];

          log.inf(`scope: ${scope}, name: ${packageName}`);

          return next(t0, {
            scope,
            packageName,
          });
        });

      return getScopeAndPackageName;
    }),
);

await core.api.start();
