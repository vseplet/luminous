import luminous from "@vseplet/luminous";

// Простое создание логгера с дефолтными транспортами
const mainLog = new luminous.Logger();
mainLog.inf`Hello from default logger`;

// Создание через статический метод
const namedLog = luminous.Logger.create("Main");
namedLog.inf`Hello from named logger`;

// Создание логгера с настройками через OptionsBuilder
const configuredOptions = new luminous.OptionsBuilder()
  .setName("Configured")
  .setLoggingLevel(luminous.Level.INFO)
  .build();
const configuredLog = new luminous.Logger(configuredOptions);
configuredLog.inf`Hello from configured logger`;

// Создание дочерних логгеров
const parentOptions = new luminous.OptionsBuilder()
  .setName("Parent")
  .addTransport(
    new luminous.formatters.TextFormatter({
      showMetadata: true,
      timestampPattern: "yyyy-MM-dd HH:mm:ss",
    }),
    new luminous.transports.TerminalTransport(),
  )
  .build();

const parentLog = new luminous.Logger(parentOptions);
const childLog1 = parentLog.child("Child1", "ex1");
childLog1.dbg`Hello from child 1`;

const childLog2 = parentLog.child("Child2", "ex2");
childLog2.wrn`Hello from child 2`;

// Иерархия: Parent -> Child -> Grandchild
const grandchildLog = childLog1.child("Grandchild");
grandchildLog.err`Hello from grandchild`;

