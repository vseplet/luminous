# Luminous

[![deno.land/x/luminous](https://shield.deno.dev/x/luminous)](https://deno.land/x/luminous)

[TestFile]()

Luminous is a extremely configurable logger for Deno written in TypeScript. It
provides a simple and flexible way to log events and messages in Deno
applications with various levels of severity. With Luminous, developers can
configure the logger to meet their specific needs and customize the logging
format to suit their preferences.

### Usage

```ts
import luminous from 'https://deno.land/x/luminous@v0.1.5/mod.ts';

const log = new luminous.Logger();
log.trc`Hello, World!`;
```

## Examples

- different logs by logging levels: [simple.ts](./examples/simple.ts)

```bash
deno task exmaple:simple
```

- inheritance of options when creating new loggers:
  [hierarchy.ts](./examples/hierarchy.ts), run:

```bash
deno task exmaple:hierarchy
```

## Contents

- [Luminous](#luminous)
  - [Usage](#usage)
  - [Examples](#examples)
  - [Contents](#contents)
  - [Levels](#levels)
  - [Logger Options](#logger-options)
  - [Transports](#transports)
  - [Formatters](#formatters)

## Levels

Luminous provides eight different logging levels that enable developers to log
events and messages with different levels of severity. Each level is designed to
serve a specific purpose and can help developers troubleshoot issues and debug
complex problems.<br><br> 0 TRACE:<br>

```ts
log.trc`This is TRACE log message`;
// 01:58:35 [TRC] default: This is TRACE log message
```

The TRACE level is the lowest level of severity in Luminous. This level is used
to log the most detailed information about an application's execution, such as
method calls, function parameters, and variable values. The TRACE level is
useful for debugging complex issues and identifying the root cause of a problem.

1 DEBUG:<br>

```ts
log.dbg`This is DEBUG log message`;
// 01:58:35 [DBG] default: This is DEBUG log message
```

The DEBUG level is used to log debugging information that is useful for
developers during application development. This level can include information
about application flow, execution paths, and other relevant details that can
help developers identify and fix bugs.

2 VERBOSE:<br>

```ts
log.vrb`This is VERBOSE log message`;
// 01:58:35 [VRB] default: This is VERBOSE log message
```

The VERBOSE level is used to log detailed information that is not critical to
the application's operation but can be useful for developers during debugging.
This level includes information about application state, network activity, and
other detailed events.

3 INFO:<br>

```ts
log.inf`This is INFO log message`;
// 01:58:35 [INF] default: This is INFO log message
```

The INFO level is used to log information about the application's operation.
This level includes messages that indicate when the application starts or stops,
when it performs significant operations, or when it encounters events that may
be of interest to developers or system administrators.

4 USER:<br>

```ts
log.usr`This is USER log message`;
// 01:58:35 [USR] default: This is USER log message
```

The USER level is used to log events that are relevant to end-users, such as
login attempts, user actions, and other user-related events. This level is
useful for tracking user behavior and identifying usability issues.

5 WARN:<br>

```ts
log.wrn`This is WARN log message`;
// 01:58:35 [WRN] default: This is WARN log message
```

The WARN level is used to log warnings about potential issues that may affect
the application's operation. This level includes messages about deprecated APIs,
invalid configuration settings, or other issues that may cause unexpected
behavior.

6 ERROR:<br>

```ts
log.err`This is ERROR log message`;
// 01:58:35 [ERR] default: This is ERROR log message
```

The ERROR level is used to log errors that occur during application execution
but are recoverable. This level includes messages about exceptions, timeouts, or
other errors that may require attention but do not necessarily require the
application to stop.

7 FATAL:<br>

```ts
log.ftl`This is FATAL log message`;
// 01:58:35 [FTL] default: This is FATAL log message
```

The FATAL level is used to log critical errors that require immediate attention
and may cause the application to stop. This level includes messages about
unrecoverable errors, such as out-of-memory errors, disk failures, or other
catastrophic events.

## Logger Options

[LoggerOptions](./src/Logger.ts) in Luminous are a set of configurable settings
that enable developers to customize the behavior and functionality of the logger
to meet their specific needs. The [OptionsBuilder](./src/OptionsBuilder.ts)
class in Luminous is a utility class that provides a fluent API for building and
configuring logger options. It allows developers to create and customize
LoggerOptions objects in a flexible and intuitive way, by providing a set of
methods for setting various options. For example:

```ts
const loggerOptions = new luminous.OptionsBuilder()
  .setName('Main')
  .build();

const logger = new luminous.Logger(loggerOptions);
logger.inf`Hello, World!`;
```

## Transports

The [AbstractTransport](./src/Transport.ts) is the base class for all transports
in Luminous. A transport is responsible for sending formatted log messages to
their final destination, which could be the console, a file, a database, or any
other endpoint. At the moment, Luminous has a
[TerminalTransport](./src/transports/Terminal.ts). For example:

```ts
// Create a new instance of TerminalTransport to send logs to the terminal.
const transport = new luminous.transports.TermianlTransport(),

// Create a new OptionsBuilder instance to configure the logger options.
const loggerOptions = new luminous.OptionsBuilder()
  .setName('Main') // Set the name of the logger to 'Main'.
  .addTransport(
    new luminous.formatters.TextFormatter(),
    transport,
  ) // Add the TextFormatter and TerminalTransport to the logger.
  .build(); // Build the final logger options object.

// Create a new logger instance with the configured options.
const logger = new luminous.Logger(loggerOptions);

// Log an information message.
logger.inf(`Hello, World!`);
// 01:58:35 [INF] Main: Hello, World!
```

## Formatters

In Luminous, a [AbstractFormatter](./src/Formatter.ts) is a class that is
responsible for formatting log messages into a human-readable string format. The
[IDataForFormatting](./src/Formatter.ts) interface defines the data that is
passed to the formatter, which includes the name of the logger, the severity
level of the log message, the message itself, and any additional metadata that
may be attached to the message. Currently, Luminous has two basic forrmaters:
[TextFormatter](./src/formatters/TextFormatter.ts) and
[JsonFormatter](./src/formatters/JsonFormatter.ts). For example:

```ts
// Create a new TextFormatter instance that formats log messages as text with metadata and a custom timestamp pattern.
const textFormatter = new luminous.formatters.TextFormatter({
  showMetadata: true,
  timestampPattern: 'yyyy-MM-dd HH:mm:ss',
});

// Create a new OptionsBuilder instance to configure the logger options.
const loggerOptions = new luminous.OptionsBuilder()
  .setName('Main') // Set the name of the logger to 'Main'.
  .addTransport(
    textFormatter,
    new luminous.transports.TerminalTransport(),
  ) // Add the TextFormatter and TerminalTransport to the logger.
  .build(); // Build the final logger options object.

// Create a new logger instance with the configured options.
const logger = new luminous.Logger(loggerOptions);

// Log an information message with metadata.
logger.inf(`Hello, World!`, { meta0: '0', meta1: '1' });
// 2023-02-26 01:58:35 [INF] Main: Hello, World! {
//  meta0: "0"
//  mrta1: "1"
// }
```
