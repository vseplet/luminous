// deno-lint-ignore-file
import { walk } from 'jsr:@std/fs@0.224.0';
import core from 'https://deno.land/x/shibui@v18/core/mod.ts';
import {
  ContextPot,
  CoreStartPot,
} from 'https://deno.land/x/shibui@v18/core/pots/mod.ts';
import { SourceType } from 'https://deno.land/x/shibui@v18/core/types.ts';
import { sh } from 'https://deno.land/x/shelly@v0.1.1/mod.ts';

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

function incrementSemver(
  version: string,
  type: 'major' | 'minor' | 'patch' | string,
): string {
  const [majorStr, minorStr, patchStr] = version.split('.');
  console.log([majorStr, minorStr, patchStr]);
  let major = parseInt(majorStr);
  let minor = parseInt(minorStr);
  let patch = parseInt(patchStr);

  switch (type) {
    case 'major':
      major++;
      minor = 0;
      patch = 0;
      break;
    case 'minor':
      minor++;
      patch = 0;
      break;
    case 'patch':
      patch++;
      break;
  }

  return `${major}.${minor}.${patch}`;
}

class UpdateVersionContext extends ContextPot<{}> {
  data = {
    updateType: 'patch',
    version: '0.0.0',
  };
}

const workflow = core.workflow(UpdateVersionContext)
  .name('Update Version')
  .on(CoreStartPot)
  .sq(({ task1 }) => {
    const t0 = task1()
      .name('Check Update Type')
      .do(async ({ pots, log, next }) => {
        const ctx = pots[0].data;

        const lastCommitText =
          (await sh('git log -1 --pretty=%B')).stdout;

        if (lastCommitText.indexOf('[major]') != -1) {
          ctx.updateType = 'major';
        } else if (lastCommitText.indexOf('[minor]') != -1) {
          ctx.updateType = 'minor';
        } else if (lastCommitText.indexOf('[patch]') != -1) {
          ctx.updateType = 'patch';
        }

        log.inf(ctx.updateType);
        return next(t1, {
          updateType: ctx.updateType,
        });
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

        return next(t2, {
          version: ctx.version,
        });

        await Deno.writeTextFile(versionsFilePath, newVersionsTS);

        log.inf(ctx.version);
        return next(t2, {
          version: ctx.version,
        });
      });

    const t2 = task1()
      .name('Update deno.json')
      .do(async ({ pots, log, next }) => {
        const ctx = pots[0].data;
        return next(t3);
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
        Deno.exit(0);
        return next(t4);
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

    const t6 = task1()
      .name('Publish to JSR')
      .do(async ({ log }) => {
        console.log(
          (await sh(`deno publish --allow-slow-types`)).stderr,
        );
        log.inf('test');
        Deno.exit(0);
      });

    return t0;
  });

core.api.settings.ALLOWED_LOGGING_SOURCE_TYPES = [
  SourceType.TASK,
];

console.log(Deno.args);

core.api.register(workflow);
await core.api.start();
