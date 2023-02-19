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

  const log = lucid.createLogger();

  log.dbg`this is debug log`;
  log.vrb`this is verbose log`;
  log.inf`this is info log`;
  log.wrn`this is info log`;
  log.err`this is info log`;
  log.ftl`this is fatal log`;
}

namespace ModuleA {
  const log = lucid.createLogger({
    name: 'ModuleA',
  });

  log.inf`this is info log`;
}

namespace ModuleB {
  const log = lucid.createLogger({
    name: 'ModuleB',
  });

  log.inf`this is info log`;
}
