# luminous

Highly configurable logger for Deno with multiple transports and formatters.

[![JSR](https://jsr.io/badges/@vseplet/luminous)](https://jsr.io/@vseplet/luminous)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/m/vseplet/luminous)](https://github.com/vseplet/luminous/pulse)
[![GitHub last commit](https://img.shields.io/github/last-commit/vseplet/luminous)](https://github.com/vseplet/luminous/commits/main)

> **Note:** This package is under active development. Contributions, feedback, and pull requests are welcome!

## Contents

- [Quick Start](#quick-start)
- [Installation](#installation)
- [Logging Levels](#logging-levels)
- [Creating Loggers](#creating-loggers)
- [Transports](#transports)
- [Formatters](#formatters)
- [Examples](#examples)
- [API Reference](#api-reference)
- [License](#license)

## Quick Start

```ts
import luminous from "jsr:@vseplet/luminous";

// Create a logger with name
const log = new luminous.Logger("MyApp");
log.inf`Hello, World!`;
// 02:15:30.123 [INF] MyApp: Hello, World!
```

## Installation

```bash
deno add @vseplet/luminous
```

```ts
import luminous from "@vseplet/luminous";
```

## Logging Levels

Luminous provides 8 logging levels:

| Level | Method  | Short Name | Description                                     |
| ----- | ------- | ---------- | ----------------------------------------------- |
| 0     | `trc()` | TRC        | Most detailed information for debugging         |
| 1     | `dbg()` | DBG        | Debug information during development            |
| 2     | `vrb()` | VRB        | Verbose information about application state     |
| 3     | `inf()` | INF        | General information about application operation |
| 4     | `usr()` | USR        | User-related events and actions                 |
| 5     | `wrn()` | WRN        | Warnings about potential issues                 |
| 6     | `err()` | ERR        | Errors that occur but are recoverable           |
| 7     | `ftl()` | FTL        | Critical errors that may stop the application   |

```ts
const log = new luminous.Logger("MyApp");

log.trc`Trace message`; // [TRC]
log.dbg`Debug message`; // [DBG]
log.vrb`Verbose message`; // [VRB]
log.inf`Info message`; // [INF]
log.usr`User message`; // [USR]
log.wrn`Warning message`; // [WRN]
log.err`Error message`; // [ERR]
log.ftl`Fatal message`; // [FTL]
```

## Creating Loggers

### Basic Logger

```ts
// Create a named logger
const log = new luminous.Logger("MyApp");

// Create default logger
const log = new luminous.Logger(); // name: "default"

// Create with options
const log = new luminous.Logger({
  name: "MyApp",
  level: luminous.Level.INFO,
  formatter: new luminous.formatters.TextFormatter(),
  transport: new luminous.transports.TerminalTransport(),
});
```

### Hierarchical Loggers

Create child loggers that inherit configuration from parent:

```ts
// Create parent logger
const parent = new luminous.Logger({
  name: "App",
  formatter: new luminous.formatters.TextFormatter({
    showMetadata: true,
    timestampPattern: "yyyy-MM-dd HH:mm:ss",
  }),
  transport: new luminous.transports.TerminalTransport(),
});

// Create child loggers
const apiLog = parent.child("API");
const dbLog = parent.child("Database", "db"); // with postfix

apiLog.inf`Request received`; // [INF] App.API: Request received
dbLog.wrn`Connection slow`; // [WRN] App.Database db: Connection slow

// Deep hierarchy with postfix
const userLog = apiLog.child("User", "auth"); // postfix as string
userLog.dbg`User authenticated`; // [DBG] App.API.User auth: User authenticated

// Child with custom options
const customChild = parent.child("Custom", {
  postfix: "test",
  level: luminous.Level.WARN,
});
```

## Transports

Transports send formatted log messages to their destination. Default transport
is `TerminalTransport` (automatically applied).

```ts
import { TerminalTransport } from "jsr:@vseplet/luminous/transports";

// Custom transport
const log = new luminous.Logger({
  name: "MyApp",
  formatter: new luminous.formatters.TextFormatter(),
  transport: new TerminalTransport(),
});
```

## Formatters

Formatters convert log data into strings. Available formatters:

### TextFormatter

Human-readable text format with colors:

```ts
import { TextFormatter } from "jsr:@vseplet/luminous/formatters";

const formatter = new TextFormatter({
  showMetadata: true,
  showTimestamp: true,
  timestampPattern: "yyyy-MM-dd HH:mm:ss",
  colorize: true,
});
```

### JsonFormatter

JSON format for structured logging:

```ts
import { JsonFormatter } from "jsr:@vseplet/luminous/formatters";

const formatter = new JsonFormatter({
  timestampPattern: "yyyy-MM-dd HH:mm:ss",
});
```

## Examples

### Basic Usage

```ts
import luminous from "@vseplet/luminous";

const log = new luminous.Logger("MyApp");
log.inf`Application started`;
log.err(new Error("Something went wrong"));
// Metadata is passed as second argument (doesn't work with template strings)
log.inf("User logged in", { userId: 123, username: "john" });
```

### Hierarchical Logging

```ts
import luminous from "@vseplet/luminous";

// Setup parent logger
const app = new luminous.Logger("App");

// Create module loggers
const api = app.child("API");
const db = app.child("Database");

api.inf`Server started on port 3000`;
db.wrn`Connection pool exhausted`;
```

### Custom Configuration

```ts
import luminous from "@vseplet/luminous";

const log = new luminous.Logger({
  name: "MyApp",
  level: luminous.Level.INFO,
  formatter: new luminous.formatters.TextFormatter({
    showMetadata: true,
    timestampPattern: "HH:mm:ss",
  }),
  transport: new luminous.transports.TerminalTransport(),
});
log.inf`Custom configured logger`;
```

Run examples:

```bash
deno task example:simple      # Basic usage
deno task example:hierarchy   # Hierarchical loggers
```

## API Reference

### Logger

- `new Logger(name?)` - Create logger with name (string) or options (object)
- `new Logger(options?)` - Create logger with options object
- `logger.child(name, options?)` - Create child logger (options can be object or
  postfix string)
- `logger.trc(msg, metadata?)` - Log trace message
- `logger.dbg(msg, metadata?)` - Log debug message
- `logger.vrb(msg, metadata?)` - Log verbose message
- `logger.inf(msg, metadata?)` - Log info message
- `logger.usr(msg, metadata?)` - Log user message
- `logger.wrn(msg, metadata?)` - Log warning message
- `logger.err(msg | Error, metadata?)` - Log error message
- `logger.ftl(msg, metadata?)` - Log fatal message

## License

[MIT](./LICENSE)
