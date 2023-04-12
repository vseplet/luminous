import luminous from '../mod.ts';

const mainLoggerOptions = new luminous.OptionsBuilder()
  .setName('Main')
  .addTransport(
    new luminous.formatters.TextFormatter({
      showMetadata: true,
      timestampPattern: 'yyyy-MM-dd HH:mm:ss',
    }),
    new luminous.transports.TerminalTransport(),
  )
  .addTransport(
    new luminous.formatters.TextFormatter({
      showMetadata: false,
      colorize: false,
      showTimestamp: false,
      timestampPattern: 'yyyy-MM-dd HH:mm:ss',
    }),
    new luminous.transports.LogfareTransport({
      source: '34da2611-e7a3-44ea-8a72-4e07e5a8aa4d',
      xApiKey: '0miJD2lHQu25',
    }),
  )
  .build();

const moduleALoggerOptions = new luminous.OptionsBuilder()
  .inherit(mainLoggerOptions)
  .setName('ModuleA')
  .build();

const moduleBLoggerOptions = new luminous.OptionsBuilder()
  .inherit(mainLoggerOptions)
  .setName('ModuleB')
  .build();

namespace Main {
  const log = new luminous.Logger(mainLoggerOptions);
  log.trc`this is trace log`;
}

namespace ModuleA {
  const log = new luminous.Logger<{ a: number; b: number }>(
    moduleALoggerOptions,
    'ex1',
  );
  log.dbg(`this is debug log`, { a: 1, b: 2 });
  log.usr`this is user log`;
}

namespace ModuleB {
  const log = new luminous.Logger(moduleBLoggerOptions, 'ex2');
  log.wrn`this is warn log`;
  log.err`this is error log`;

  log.err(new Error('hehe'));
}
