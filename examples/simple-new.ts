import luminous from "@vseplet/luminous";

// Простое создание с именем
const log = new luminous.Logger("MyApp");
log.inf`Hello, World!`;

// С опциями
const log2 = new luminous.Logger({
  name: "App",
  level: luminous.Level.INFO,
  formatter: new luminous.formatters.TextFormatter(),
  transport: new luminous.transports.TerminalTransport(),
});
log2.inf`Configured logger`;

// Иерархия
const parent = new luminous.Logger({
  name: "App",
  formatter: new luminous.formatters.TextFormatter({ showMetadata: true }),
  transport: new luminous.transports.TerminalTransport(),
});

const child = parent.child("API");
child.inf`Request received`;

const grandchild = child.child("User", "auth"); // postfix as string
grandchild.dbg`User authenticated`;
