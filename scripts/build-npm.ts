import {
  build,
  emptyDir,
} from 'https://deno.land/x/dnt@0.38.1/mod.ts';

await emptyDir('./.npm');

await build({
  entryPoints: ['./mod.ts'],
  outDir: './.npm',
  shims: {
    deno: true,
    undici: true,
  },

  package: {
    name: '@sevapp/luminous',
    version: Deno.args[0],
    main: './esm/mod.js',
    description: 'Extremely configurable logger for Deno and Node.js',
    license: 'LGPL-2.1',
    repository: {
      type: 'git',
      url: 'git+https://github.com/sevapp/luminous.git',
    },
    bugs: {
      url: 'https://github.com/sevapp/luminous/issues',
    },
    keywords: [
      'formatter',
      'typescript',
      'log',
      'log4j',
      'logger',
      'logging',
      'logs',
      'transport',
    ],
    author: 'Vsevolod Pletnev (sevapp)',
  },

  postBuild() {
    Deno.copyFileSync('LICENSE', '.npm/LICENSE');
    Deno.copyFileSync('README.md', '.npm/README.md');
  },
});
