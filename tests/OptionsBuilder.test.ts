import { assertEquals } from "@std/assert";
import { OptionsBuilder } from "../source/OptionsBuilder.ts";
import { Level } from "../source/Level.ts";
import { TextFormatter } from "../source/formatters/TextFormatter.ts";
import { TerminalTransport } from "../source/transports/Terminal.ts";

Deno.test("OptionsBuilder should build default options", () => {
  const options = new OptionsBuilder().build();
  
  assertEquals(options.name, "default");
  assertEquals(options.loggingLevel, Level.TRACE);
  assertEquals(options.parents.length, 0);
  assertEquals(options.excludedLoggingLevels.length, 0);
  assertEquals(options.listOfFormatterAndTransports.length, 1);
});

Deno.test("OptionsBuilder should set name", () => {
  const options = new OptionsBuilder()
    .setName("TestLogger")
    .build();
  
  assertEquals(options.name, "TestLogger");
});

Deno.test("OptionsBuilder should set logging level", () => {
  const options = new OptionsBuilder()
    .setLoggingLevel(Level.INFO)
    .build();
  
  assertEquals(options.loggingLevel, Level.INFO);
});

Deno.test("OptionsBuilder should exclude single level", () => {
  const options = new OptionsBuilder()
    .excludeLevel(Level.DEBUG)
    .build();
  
  assertEquals(options.excludedLoggingLevels.length, 1);
  assertEquals(options.excludedLoggingLevels[0], Level.DEBUG);
});

Deno.test("OptionsBuilder should exclude multiple levels", () => {
  const options = new OptionsBuilder()
    .excludeLevels([Level.DEBUG, Level.VERBOSE])
    .build();
  
  assertEquals(options.excludedLoggingLevels.length, 2);
  assertEquals(options.excludedLoggingLevels.includes(Level.DEBUG), true);
  assertEquals(options.excludedLoggingLevels.includes(Level.VERBOSE), true);
});

Deno.test("OptionsBuilder should add transport", () => {
  const formatter = new TextFormatter();
  const transport = new TerminalTransport();
  
  const options = new OptionsBuilder()
    .addTransport(formatter, transport)
    .build();
  
  assertEquals(options.listOfFormatterAndTransports.length, 1);
  assertEquals(options.listOfFormatterAndTransports[0].formatter, formatter);
  assertEquals(options.listOfFormatterAndTransports[0].transports.length, 1);
  assertEquals(options.listOfFormatterAndTransports[0].transports[0], transport);
});

Deno.test("OptionsBuilder should add multiple transports", () => {
  const formatter = new TextFormatter();
  const transport1 = new TerminalTransport();
  const transport2 = new TerminalTransport();
  
  const options = new OptionsBuilder()
    .addTransports(formatter, [transport1, transport2])
    .build();
  
  assertEquals(options.listOfFormatterAndTransports.length, 1);
  assertEquals(options.listOfFormatterAndTransports[0].transports.length, 2);
});

Deno.test("OptionsBuilder should inherit from parent", () => {
  const parentOptions = new OptionsBuilder()
    .setName("Parent")
    .setLoggingLevel(Level.WARN)
    .build();
  
  const childOptions = new OptionsBuilder()
    .inherit(parentOptions)
    .setName("Child")
    .build();
  
  assertEquals(childOptions.name, "Child");
  assertEquals(childOptions.loggingLevel, Level.WARN);
  assertEquals(childOptions.parents.length, 1);
  assertEquals(childOptions.parents[0], "Parent");
});

Deno.test("OptionsBuilder should inherit excluded levels from parent", () => {
  const parentOptions = new OptionsBuilder()
    .excludeLevel(Level.DEBUG)
    .build();
  
  const childOptions = new OptionsBuilder()
    .inherit(parentOptions)
    .excludeLevel(Level.VERBOSE)
    .build();
  
  assertEquals(childOptions.excludedLoggingLevels.length, 2);
  assertEquals(childOptions.excludedLoggingLevels.includes(Level.DEBUG), true);
  assertEquals(childOptions.excludedLoggingLevels.includes(Level.VERBOSE), true);
});

Deno.test("OptionsBuilder should inherit transports from parent", () => {
  const formatter = new TextFormatter();
  const transport = new TerminalTransport();
  
  const parentOptions = new OptionsBuilder()
    .addTransport(formatter, transport)
    .build();
  
  const childOptions = new OptionsBuilder()
    .inherit(parentOptions)
    .build();
  
  assertEquals(childOptions.listOfFormatterAndTransports.length, 1);
});

Deno.test("OptionsBuilder should support method chaining", () => {
  const options = new OptionsBuilder()
    .setName("Test")
    .setLoggingLevel(Level.INFO)
    .excludeLevel(Level.DEBUG)
    .build();
  
  assertEquals(options.name, "Test");
  assertEquals(options.loggingLevel, Level.INFO);
  assertEquals(options.excludedLoggingLevels.length, 1);
});

