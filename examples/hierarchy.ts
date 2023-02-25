import luminous from '../mod.ts';

const mainLogerOptions = new luminous.OptionsBuilder()
  .setName('Main')
  .addTransport(
    new luminous.formatters.TextFormatter({
      showMetadata: true,
      timestampPattern: 'yyyy-MM-dd HH:mm:ss',
    }),
    new luminous.transports.TermianlTransport(),
  )
  .build();

const moduleALogerOptions = new luminous.OptionsBuilder()
  .setDefaultOptions(mainLogerOptions)
  .setName('ModuleA')
  .build();

const moduleBLogerOptions = new luminous.OptionsBuilder()
  .setDefaultOptions(mainLogerOptions)
  .setName('ModuleB')
  .build();

namespace Main {
  const log = new luminous.Logger(mainLogerOptions);

  log.trc`this is trace log`;
}

namespace ModuleA {
  const log = new luminous.Logger<{ a: number; b: number }>(
    moduleALogerOptions,
  );
  log.dbg(`this is debug log`, { a: 1, b: 2 });
  log.usr`this is user log`;
}

namespace ModuleB {
  const log = new luminous.Logger(moduleBLogerOptions);
  log.wrn`this is warn log`;
  log.err`this is error log`;
}
