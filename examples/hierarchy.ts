import lucid from '../mod.ts';

const mainLogerOptions = new lucid.OptionsBuilder()
  .setName('Main')
  .addTransport(
    new lucid.formatters.TextFormatter({
      showMetadata: true,
      timestampPattern: 'yyyy-MM-dd HH:mm:ss',
    }),
    new lucid.transports.TermianlTransport(),
  )
  .build();

const moduleALogerOptions = new lucid.OptionsBuilder()
  .setDefaultOptions(mainLogerOptions)
  .setName('ModuleA')
  .build();

const moduleBLogerOptions = new lucid.OptionsBuilder()
  .setDefaultOptions(mainLogerOptions)
  .setName('ModuleB')
  .build();

namespace Main {
  const log = new lucid.Logger(mainLogerOptions);

  log.trc`this is trace log`;
  log.dbg`this is debug log`;
  log.wrn(`this is info log`, { a: 1, b: 2 });
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
