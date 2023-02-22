import lucid from '../mod.ts';

const mainLogerOptions = new lucid.OptionsBuilder()
  .setName('Main')
  .build();

const moduleALogerOptions = new lucid.OptionsBuilder()
  .setDefaultOptions(mainLogerOptions)
  .setName('ModuleA')
  .setLoggingLevel(lucid.Level.DEBUG)
  .build();

const moduleBLogerOptions = new lucid.OptionsBuilder()
  .setDefaultOptions(mainLogerOptions)
  .setName('ModuleB')
  .setLoggingLevel(lucid.Level.USER)
  .build();

namespace Main {
  const log = new lucid.Logger(mainLogerOptions);
  log.trc`this is trace log`;
  log.dbg`this is debug log`;
  log.vrb`this is verbose log`;
}

namespace ModuleA {
  const log = new lucid.Logger<{ a: number; b: number }>(
    moduleALogerOptions,
  );
  log.trc(`this is info log`, { a: 1, b: 2 });
  log.usr`this is info log`;
}

namespace ModuleB {
  const log = new lucid.Logger(moduleBLogerOptions);
  log.wrn`this is warn log`;
}
