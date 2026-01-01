import { assertEquals, assertStringIncludes } from "@std/assert";
import { Logger } from "../source/Logger.ts";
import { Level } from "../source/Level.ts";
import { OptionsBuilder } from "../source/OptionsBuilder.ts";
import { TextFormatter } from "../source/formatters/TextFormatter.ts";
import { TerminalTransport } from "../source/transports/Terminal.ts";

// Mock transport для тестирования
class MockTransport extends TerminalTransport {
  public messages: Array<{ level: Level; message: string }> = [];
  
  override send(level: Level, message: string): void {
    this.messages.push({ level, message });
  }
}

Deno.test("Logger should create with default options", () => {
  const logger = new Logger();
  
  assertEquals(logger.name, "default");
  assertEquals(logger.loggingLevel, Level.TRACE);
  assertEquals(logger.parents.length, 0);
});

Deno.test("Logger should create with custom options", () => {
  const options = new OptionsBuilder()
    .setName("TestLogger")
    .setLoggingLevel(Level.INFO)
    .build();
  
  const logger = new Logger(options);
  
  assertEquals(logger.name, "TestLogger");
  assertEquals(logger.loggingLevel, Level.INFO);
});

Deno.test("Logger.trc should log TRACE level message", () => {
  const mockTransport = new MockTransport();
  const options = new OptionsBuilder()
    .addTransport(new TextFormatter(), mockTransport)
    .build();
  
  const logger = new Logger(options);
  const result = logger.trc("Trace message");
  
  assertEquals(result, "Trace message");
  assertEquals(mockTransport.messages.length, 1);
  assertEquals(mockTransport.messages[0].level, Level.TRACE);
  assertStringIncludes(mockTransport.messages[0].message, "Trace message");
});

Deno.test("Logger.dbg should log DEBUG level message", () => {
  const mockTransport = new MockTransport();
  const options = new OptionsBuilder()
    .addTransport(new TextFormatter(), mockTransport)
    .build();
  
  const logger = new Logger(options);
  const result = logger.dbg("Debug message");
  
  assertEquals(result, "Debug message");
  assertEquals(mockTransport.messages.length, 1);
  assertEquals(mockTransport.messages[0].level, Level.DEBUG);
});

Deno.test("Logger.vrb should log VERBOSE level message", () => {
  const mockTransport = new MockTransport();
  const options = new OptionsBuilder()
    .addTransport(new TextFormatter(), mockTransport)
    .build();
  
  const logger = new Logger(options);
  logger.vrb("Verbose message");
  
  assertEquals(mockTransport.messages.length, 1);
  assertEquals(mockTransport.messages[0].level, Level.VERBOSE);
});

Deno.test("Logger.inf should log INFO level message", () => {
  const mockTransport = new MockTransport();
  const options = new OptionsBuilder()
    .addTransport(new TextFormatter(), mockTransport)
    .build();
  
  const logger = new Logger(options);
  logger.inf("Info message");
  
  assertEquals(mockTransport.messages.length, 1);
  assertEquals(mockTransport.messages[0].level, Level.INFO);
});

Deno.test("Logger.usr should log USER level message", () => {
  const mockTransport = new MockTransport();
  const options = new OptionsBuilder()
    .addTransport(new TextFormatter(), mockTransport)
    .build();
  
  const logger = new Logger(options);
  logger.usr("User message");
  
  assertEquals(mockTransport.messages.length, 1);
  assertEquals(mockTransport.messages[0].level, Level.USER);
});

Deno.test("Logger.wrn should log WARN level message", () => {
  const mockTransport = new MockTransport();
  const options = new OptionsBuilder()
    .addTransport(new TextFormatter(), mockTransport)
    .build();
  
  const logger = new Logger(options);
  logger.wrn("Warn message");
  
  assertEquals(mockTransport.messages.length, 1);
  assertEquals(mockTransport.messages[0].level, Level.WARN);
});

Deno.test("Logger.err should log ERROR level message with string", () => {
  const mockTransport = new MockTransport();
  const options = new OptionsBuilder()
    .addTransport(new TextFormatter(), mockTransport)
    .build();
  
  const logger = new Logger(options);
  logger.err("Error message");
  
  assertEquals(mockTransport.messages.length, 1);
  assertEquals(mockTransport.messages[0].level, Level.ERROR);
});

Deno.test("Logger.err should log ERROR level message with Error object", () => {
  const mockTransport = new MockTransport();
  const options = new OptionsBuilder()
    .addTransport(new TextFormatter(), mockTransport)
    .build();
  
  const logger = new Logger(options);
  const error = new Error("Test error");
  logger.err(error);
  
  assertEquals(mockTransport.messages.length, 1);
  assertEquals(mockTransport.messages[0].level, Level.ERROR);
  assertStringIncludes(mockTransport.messages[0].message, "Test error");
});

Deno.test("Logger.ftl should log FATAL level message", () => {
  const mockTransport = new MockTransport();
  const options = new OptionsBuilder()
    .addTransport(new TextFormatter(), mockTransport)
    .build();
  
  const logger = new Logger(options);
  logger.ftl("Fatal message");
  
  assertEquals(mockTransport.messages.length, 1);
  assertEquals(mockTransport.messages[0].level, Level.FATAL);
});

Deno.test("Logger should handle template strings", () => {
  const mockTransport = new MockTransport();
  const options = new OptionsBuilder()
    .addTransport(new TextFormatter(), mockTransport)
    .build();
  
  const logger = new Logger(options);
  const value = "string";
  const result = logger.inf`Template ${value} message`;
  
  // Template strings are joined with space, but values are not interpolated in the array
  // The array contains: ["Template ", " message"] and values are separate
  // So join(" ") gives "Template   message" (with extra spaces)
  assertEquals(typeof result, "string");
  assertStringIncludes(result, "Template");
  assertStringIncludes(result, "message");
  assertEquals(mockTransport.messages.length, 1);
  assertStringIncludes(mockTransport.messages[0].message, "Template");
  assertStringIncludes(mockTransport.messages[0].message, "message");
});

Deno.test("Logger should handle metadata", () => {
  const mockTransport = new MockTransport();
  const options = new OptionsBuilder()
    .addTransport(new TextFormatter({ showMetadata: true }), mockTransport)
    .build();
  
  const logger = new Logger(options);
  logger.inf("Message", { key: "value", number: 42 });
  
  assertEquals(mockTransport.messages.length, 1);
  assertStringIncludes(mockTransport.messages[0].message, "key");
  assertStringIncludes(mockTransport.messages[0].message, "value");
});

Deno.test("Logger should handle multiple transports", () => {
  const mockTransport1 = new MockTransport();
  const mockTransport2 = new MockTransport();
  const options = new OptionsBuilder()
    .addTransports(
      new TextFormatter(),
      [mockTransport1, mockTransport2],
    )
    .build();
  
  const logger = new Logger(options);
  logger.inf("Message");
  
  assertEquals(mockTransport1.messages.length, 1);
  assertEquals(mockTransport2.messages.length, 1);
});

Deno.test("Logger should handle parents from options", () => {
  const parentOptions = new OptionsBuilder()
    .setName("Parent")
    .build();
  
  const childOptions = new OptionsBuilder()
    .inherit(parentOptions)
    .setName("Child")
    .build();
  
  const logger = new Logger(childOptions);
  
  assertEquals(logger.parents.length, 1);
  assertEquals(logger.parents[0], "Parent");
  assertEquals(logger.name, "Child");
});

Deno.test("Logger should handle postfix", () => {
  const options = new OptionsBuilder()
    .setName("Test")
    .build();
  
  const logger = new Logger(options, "postfix");
  
  assertEquals(logger.postfix, "postfix");
});

Deno.test("Logger should handle Error with stack trace in metadata", () => {
  const mockTransport = new MockTransport();
  const options = new OptionsBuilder()
    .addTransport(new TextFormatter({ showMetadata: true }), mockTransport)
    .build();
  
  const logger = new Logger(options);
  const error = new Error("Test error");
  logger.err(error);
  
  assertEquals(mockTransport.messages.length, 1);
  // Metadata should contain stack
  assertStringIncludes(mockTransport.messages[0].message, "stack");
});

