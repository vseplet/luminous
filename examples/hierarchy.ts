import lucid from '../mod.ts';

const mainLogerOptions = lucid.createOptionsBuilder()
  .setName('Main')
  .setLevel(lucid.Level.TRACE)
  .build();

const moduleALogerOptions = lucid.createOptionsBuilder()
  .setName('ModuleA')
  .setLevel(lucid.Level.TRACE)
  .setParent(mainLogerOptions)
  .build();

const moduleBLogerOptions = lucid.createOptionsBuilder()
  .setName('ModuleB')
  .setLevel(lucid.Level.TRACE)
  .setParent(mainLogerOptions)
  .build();

namespace Main {
  lucid.setDefaultOptions({
    name: 'Main',
  });

  const log = lucid.createLogger(mainLogerOptions);
  log.trc`this is trace log`;
  log.dbg`this is debug log`;
  log.vrb`this is verbose log`;
}

namespace ModuleA {
  const log = lucid.createLogger(moduleALogerOptions);
  log.inf`this is info log`;
}

namespace ModuleB {
  const log = lucid.createLogger(moduleBLogerOptions);
  log.wrn`this is info log`;
}
