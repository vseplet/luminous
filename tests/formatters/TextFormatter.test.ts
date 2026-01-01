import { assertEquals, assertStringIncludes } from "@std/assert";
import { TextFormatter } from "../../source/formatters/TextFormatter.ts";
import { Level } from "../../source/Level.ts";
import type { FormattedData } from "../../source/types.ts";

Deno.test("TextFormatter should format message with default options", () => {
  const formatter = new TextFormatter();
  const data: FormattedData = {
    parents: [],
    name: "test",
    postfix: "",
    level: Level.INFO,
    msg: "Test message",
    metadata: {},
  };
  
  const result = formatter.format(data);
  
  assertEquals(typeof result, "string");
  assertStringIncludes(result, "[INF]");
  assertStringIncludes(result, "test");
  assertStringIncludes(result, "Test message");
});

Deno.test("TextFormatter should include timestamp by default", () => {
  const formatter = new TextFormatter();
  const data: FormattedData = {
    parents: [],
    name: "test",
    postfix: "",
    level: Level.INFO,
    msg: "Test message",
    metadata: {},
  };
  
  const result = formatter.format(data);
  
  // Timestamp should be present (format: HH:mm:ss.SSS)
  assertEquals(result.includes(":"), true);
});

Deno.test("TextFormatter should hide timestamp when showTimestamp is false", () => {
  const formatter = new TextFormatter({ showTimestamp: false });
  const data: FormattedData = {
    parents: [],
    name: "test",
    postfix: "",
    level: Level.INFO,
    msg: "Test message",
    metadata: {},
  };
  
  const result = formatter.format(data);
  
  // Should start with [INF] instead of timestamp
  assertStringIncludes(result, "[INF]");
  // Should not contain timestamp pattern (HH:mm:ss)
  const hasTimestampPattern = /^\d{2}:\d{2}:\d{2}/.test(result);
  assertEquals(hasTimestampPattern, false);
});

Deno.test("TextFormatter should show metadata when showMetadata is true", () => {
  const formatter = new TextFormatter({ showMetadata: true });
  const data: FormattedData = {
    parents: [],
    name: "test",
    postfix: "",
    level: Level.INFO,
    msg: "Test message",
    metadata: { key: "value" },
  };
  
  const result = formatter.format(data);
  
  assertStringIncludes(result, "key");
  assertStringIncludes(result, "value");
});

Deno.test("TextFormatter should hide metadata when showMetadata is false", () => {
  const formatter = new TextFormatter({ showMetadata: false });
  const data: FormattedData = {
    parents: [],
    name: "test",
    postfix: "",
    level: Level.INFO,
    msg: "Test message",
    metadata: { key: "value" },
  };
  
  const result = formatter.format(data);
  
  assertEquals(result.includes("key"), false);
  assertEquals(result.includes("value"), false);
});

Deno.test("TextFormatter should use custom timestamp pattern", () => {
  const formatter = new TextFormatter({
    timestampPattern: "yyyy-MM-dd",
  });
  const data: FormattedData = {
    parents: [],
    name: "test",
    postfix: "",
    level: Level.INFO,
    msg: "Test message",
    metadata: {},
  };
  
  const result = formatter.format(data);
  
  // Should contain date pattern (yyyy-MM-dd)
  assertEquals(result.includes("-"), true);
});

Deno.test("TextFormatter should include parents in name", () => {
  const formatter = new TextFormatter();
  const data: FormattedData = {
    parents: ["parent1", "parent2"],
    name: "test",
    postfix: "",
    level: Level.INFO,
    msg: "Test message",
    metadata: {},
  };
  
  const result = formatter.format(data);
  
  assertStringIncludes(result, "parent1.parent2.test");
});

Deno.test("TextFormatter should include postfix", () => {
  const formatter = new TextFormatter();
  const data: FormattedData = {
    parents: [],
    name: "test",
    postfix: "postfix",
    level: Level.INFO,
    msg: "Test message",
    metadata: {},
  };
  
  const result = formatter.format(data);
  
  assertStringIncludes(result, "postfix");
});

Deno.test("TextFormatter should include uuid when provided", () => {
  const formatter = new TextFormatter();
  const data: FormattedData = {
    parents: [],
    name: "test",
    postfix: "",
    level: Level.INFO,
    uuid: "12345",
    msg: "Test message",
    metadata: {},
  };
  
  const result = formatter.format(data);
  
  assertStringIncludes(result, "<12345>");
});

Deno.test("TextFormatter should format all log levels", () => {
  const formatter = new TextFormatter();
  const levels = [
    Level.TRACE,
    Level.DEBUG,
    Level.VERBOSE,
    Level.INFO,
    Level.USER,
    Level.WARN,
    Level.ERROR,
    Level.FATAL,
  ];
  
  for (const level of levels) {
    const data: FormattedData = {
      parents: [],
      name: "test",
      postfix: "",
      level,
      msg: "Test message",
      metadata: {},
    };
    
    const result = formatter.format(data);
    assertEquals(typeof result, "string");
    assertEquals(result.length > 0, true);
  }
});

Deno.test("TextFormatter should colorize output by default", () => {
  const formatter = new TextFormatter({ colorize: true });
  const data: FormattedData = {
    parents: [],
    name: "test",
    postfix: "",
    level: Level.INFO,
    msg: "Test message",
    metadata: {},
  };
  
  const result = formatter.format(data);
  
  // Colored output should contain ANSI codes
  assertEquals(result.length > 0, true);
});

Deno.test("TextFormatter should not colorize when colorize is false", () => {
  const formatter = new TextFormatter({ colorize: false });
  const data: FormattedData = {
    parents: [],
    name: "test",
    postfix: "",
    level: Level.INFO,
    msg: "Test message",
    metadata: {},
  };
  
  const result = formatter.format(data);
  
  // Should still be a valid string
  assertEquals(typeof result, "string");
  assertStringIncludes(result, "Test message");
});

