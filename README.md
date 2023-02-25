# Luminous
Luminous is a extremely configurable logger for Deno written in TypeScript. It provides a simple and flexible way to log events and messages in Deno applications with various levels of severity. With Luminous, developers can configure the logger to meet their specific needs and customize the logging format to suit their preferences.

### Usage
```ts
import luminous from "https://deno.land/x/luminous@v0.1.3/mod.ts";

const log = new luminous.Logger();
log.trc`Hello, World!`;
```

## Examples
... TODO

## Contents
- [Luminous](#luminous)
    - [Usage](#usage)
  - [Examples](#examples)
  - [Contents](#contents)
  - [Levels](#levels)
  - [Logger options](#logger-options)
  - [Formats](#formats)
  - [Transports](#transports)

## Levels
Luminous provides eight different logging levels that enable developers to log events and messages with different levels of severity. Each level is designed to serve a specific purpose and can help developers troubleshoot issues and debug complex problems.<br><br>
0 TRACE:<br>
```ts
log.trc`This is TRACE log message`;
```
The TRACE level is the lowest level of severity in Luminous. This level is used to log the most detailed information about an application's execution, such as method calls, function parameters, and variable values. The TRACE level is useful for debugging complex issues and identifying the root cause of a problem.

1 DEBUG:<br>
```ts
log.dbg`This is DEBUG log message`;
```
The DEBUG level is used to log debugging information that is useful for developers during application development. This level can include information about application flow, execution paths, and other relevant details that can help developers identify and fix bugs.

2 VERBOSE:<br>
```ts
log.vrb`This is VERBOSE log message`;
```
The VERBOSE level is used to log detailed information that is not critical to the application's operation but can be useful for developers during debugging. This level includes information about application state, network activity, and other detailed events.

3 INFO:<br>
```ts
log.inf`This is INFO log message`;
```
The INFO level is used to log information about the application's operation. This level includes messages that indicate when the application starts or stops, when it performs significant operations, or when it encounters events that may be of interest to developers or system administrators.

4 USER:<br>
```ts
log.usr`This is USER log message`;
```
The USER level is used to log events that are relevant to end-users, such as login attempts, user actions, and other user-related events. This level is useful for tracking user behavior and identifying usability issues.

5 WARN:<br>
```ts
log.wrn`This is WARN log message`;
```
The WARN level is used to log warnings about potential issues that may affect the application's operation. This level includes messages about deprecated APIs, invalid configuration settings, or other issues that may cause unexpected behavior.


6 ERROR:<br>
```ts
log.err`This is ERROR log message`;
```
The ERROR level is used to log errors that occur during application execution but are recoverable. This level includes messages about exceptions, timeouts, or other errors that may require attention but do not necessarily require the application to stop.

7 FATAL:<br>
```ts
log.ftl`This is FATAL log message`;
```
The FATAL level is used to log critical errors that require immediate attention and may cause the application to stop. This level includes messages about unrecoverable errors, such as out-of-memory errors, disk failures, or other catastrophic events.

## Logger options
[LoggerOptions](https://github.com/sevapp/luminous/blob/main/src/Logger.ts#L15) in Luminous are a set of configurable settings that enable developers to customize the behavior and functionality of the logger to meet their specific needs. 
The [OptionsBuilder](https://github.com/sevapp/luminous/blob/main/src/OptionsBuilder.ts) class in Luminous is a utility class that provides a fluent API for building and configuring logger options. It allows developers to create and customize LoggerOptions objects in a flexible and intuitive way, by providing a set of methods for setting various options. For example:
```ts
const loggerOptions = new luminous.OptionsBuilder()
  .setName('Main')
  .build();

const logger = new luminous.Logger(loggerOptions);
logger.inf`Hello, World!`;
```

## Formats
... TODO

## Transports
... TODO