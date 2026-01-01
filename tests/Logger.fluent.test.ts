import { assertEquals, assertStringIncludes } from "@std/assert";
import { Logger } from "../source/Logger.ts";
import { OptionsBuilder } from "../source/OptionsBuilder.ts";
import { TextFormatter } from "../source/formatters/TextFormatter.ts";
import { TerminalTransport } from "../source/transports/Terminal.ts";

// Mock transport для тестирования
class MockTransport extends TerminalTransport {
  public messages: Array<{ level: number; message: string }> = [];

  override send(level: number, message: string): void {
    this.messages.push({ level, message });
  }
}

Deno.test("Logger constructor with string should create logger with name", () => {
  const logger = new Logger("TestLogger");

  assertEquals(logger.name, "TestLogger");
  assertEquals(logger.listOfFormatterAndTransports.length, 1);
});

Deno.test("Logger should have default transports when created", () => {
  const logger = new Logger();

  assertEquals(logger.listOfFormatterAndTransports.length, 1);
  assertEquals(
    logger.listOfFormatterAndTransports[0].formatter instanceof TextFormatter,
    true,
  );
  assertEquals(
    logger.listOfFormatterAndTransports[0].transports[0] instanceof
      TerminalTransport,
    true,
  );
});

Deno.test("Logger.child() should create child logger", () => {
  const parent = new Logger("Parent");
  const child = parent.child("Child");

  assertEquals(child.name, "Child");
  assertEquals(child.parents.length, 1);
  assertEquals(child.parents[0], "Parent");
});

Deno.test("Logger.child() should inherit transports from parent", () => {
  const mockTransport = new MockTransport();
  const formatter = new TextFormatter();

  const parentOptions = new OptionsBuilder()
    .setName("Parent")
    .addTransport(formatter, mockTransport)
    .build();

  const parent = new Logger(parentOptions);
  const child = parent.child("Child");

  assertEquals(child.listOfFormatterAndTransports.length, 1);
  assertEquals(child.listOfFormatterAndTransports[0].formatter, formatter);
});

Deno.test("Logger.child() should support postfix", () => {
  const parent = new Logger("Parent");
  const child = parent.child("Child", "postfix");

  assertEquals(child.postfix, "postfix");
});

Deno.test("Logger.child() should create deep hierarchy", () => {
  const parent = new Logger("Parent");
  const child = parent.child("Child");
  const grandchild = child.child("Grandchild");

  assertEquals(grandchild.parents.length, 2);
  assertEquals(grandchild.parents[0], "Parent");
  assertEquals(grandchild.parents[1], "Child");
  assertEquals(grandchild.name, "Grandchild");
});

Deno.test("Logger.child() should log with correct hierarchy", () => {
  const mockTransport = new MockTransport();
  const formatter = new TextFormatter();

  const parent = new Logger({
    name: "Parent",
    formatter,
    transport: mockTransport,
  });
  const child = parent.child("Child");
  child.inf("Test message");

  assertEquals(mockTransport.messages.length, 1);
  assertStringIncludes(mockTransport.messages[0].message, "Parent.Child");
});

Deno.test("Logger.getDefaultTransports() should return default formatter and transport", () => {
  const defaults = Logger.getDefaultTransports();

  assertEquals(defaults.formatter instanceof TextFormatter, true);
  assertEquals(defaults.transports.length, 1);
  assertEquals(defaults.transports[0] instanceof TerminalTransport, true);
});
