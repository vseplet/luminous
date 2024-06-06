// deno-lint-ignore-file
import { walk } from 'jsr:@std/fs@0.224.0';
import core from 'https://deno.land/x/shibui@v18/core/mod.ts';
import {
  ContextPot,
  CoreStartPot,
} from 'https://deno.land/x/shibui@v18/core/pots/mod.ts';
import { SourceType } from 'https://deno.land/x/shibui@v18/core/types.ts';
import { sh } from 'https://deno.land/x/shelly@v0.1.1/mod.ts';
import { incrementSemver } from 'https://deno.land/x/automation_scripts@0.0.0/ci-cd/helpers/mod.ts';
import { checkUpdateTypeByCommitMessage } from 'https://deno.land/x/automation_scripts@0.0.0/ci-cd/tasks/mod.ts';

const scope = Deno.args[0];
const packageName = Deno.args[1];
const denoJsonFilePath = './deno.json';
const versionsFilePath = './source/versions.ts';
const versionsExportPattern = /export default \[\s*([\s\S]*?)\s*\];/;

const mdUrlPattern = new RegExp(
  String
    .raw`import\s+[^;]+from\s+'jsr:@${scope}\/${packageName}@[^']+';`,
  'g',
);

const mdUrlReplacePattern = new RegExp(
  String
    .raw`(@${scope}\/${packageName}@)[^']+`,
);

class UpdateVersionContext extends ContextPot<{
  updateType: string;
  version: string;
}> {
  data = {
    updateType: 'patch',
    version: '0.0.0',
  };
}

const workflow = core.workflow(UpdateVersionContext)
  .name('Update Version')
  .on(CoreStartPot)
  .sq(({ task1 }) => {
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
      .name('Update imports in .md files')
      .do(async ({ pots, log, next }) => {
        const ctx = pots[0].data;

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
        const denoJsonRaw = await Deno.readTextFile(denoJsonFilePath);
        const json = JSON.parse(denoJsonRaw);

        if (json.version) {
          json.version = ctx.version;
          const newContent = JSON.stringify(json, null, 2);
          await Deno.writeTextFile(denoJsonFilePath, newContent);
        }

        log.inf(ctx.version);
        return next(t3);
      });

    const t1 = task1()
      .name('Update versions.ts')
      .do(async ({ pots, log, next }) => {
        const ctx = pots[0].data;
        const oldVersionsTS = await Deno.readTextFile(
          versionsFilePath,
        );
        let newVersionsTS = '';
        const match = oldVersionsTS.match(versionsExportPattern);

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

        await Deno.writeTextFile(versionsFilePath, newVersionsTS);

        log.inf(ctx.version);
        return next(t2, {
          version: ctx.version,
        });
      });

    const t0 = checkUpdateTypeByCommitMessage(
      UpdateVersionContext,
      t1,
    );

    return t0;
  });

core.api.settings.ALLOWED_LOGGING_SOURCE_TYPES = [
  SourceType.TASK,
];

console.log(Deno.args);

core.api.register(workflow);
await core.api.start();
