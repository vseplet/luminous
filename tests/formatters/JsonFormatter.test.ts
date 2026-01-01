import { assertEquals, assertStringIncludes } from "@std/assert";
import { JsonFormatter } from "../../source/formatters/JsonFormatter.ts";
import { Level } from "../../source/Level.ts";
import type { FormattedData } from "../../source/types.ts";

Deno.test("JsonFormatter should format message as JSON", () => {
  const formatter = new JsonFormatter();
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

  // Should be valid JSON
  const parsed = JSON.parse(result);
  assertEquals(parsed.msg, "Test message");
  assertEquals(parsed.name, "test");
  assertEquals(parsed.level, Level.INFO);
});

Deno.test("JsonFormatter should include timestamp", () => {
  const formatter = new JsonFormatter();
  const data: FormattedData = {
    parents: [],
    name: "test",
    postfix: "",
    level: Level.INFO,
    msg: "Test message",
    metadata: {},
  };

  const result = formatter.format(data);
  const parsed = JSON.parse(result);

  assertEquals(typeof parsed.time, "string");
  assertEquals(parsed.time.length > 0, true);
});

Deno.test("JsonFormatter should include all data fields", () => {
  const formatter = new JsonFormatter();
  const data: FormattedData = {
    parents: ["parent1"],
    name: "test",
    postfix: "postfix",
    level: Level.INFO,
    msg: "Test message",
    metadata: { key: "value" },
  };

  const result = formatter.format(data);
  const parsed = JSON.parse(result);

  assertEquals(Array.isArray(parsed.parents), true);
  assertEquals(parsed.parents[0], "parent1");
  assertEquals(parsed.name, "test");
  assertEquals(parsed.postfix, "postfix");
  assertEquals(parsed.level, Level.INFO);
  assertEquals(parsed.msg, "Test message");
  assertEquals(parsed.metadata.key, "value");
});

Deno.test("JsonFormatter should use custom timestamp pattern", () => {
  const formatter = new JsonFormatter({
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
  const parsed = JSON.parse(result);

  // Should contain date pattern
  assertEquals(parsed.time.includes("-"), true);
});

Deno.test("JsonFormatter should format all log levels", () => {
  const formatter = new JsonFormatter();
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
    const parsed = JSON.parse(result);

    assertEquals(parsed.level, level);
    assertEquals(parsed.msg, "Test message");
  }
});

Deno.test("JsonFormatter should handle empty metadata", () => {
  const formatter = new JsonFormatter();
  const data: FormattedData = {
    parents: [],
    name: "test",
    postfix: "",
    level: Level.INFO,
    msg: "Test message",
    metadata: {},
  };

  const result = formatter.format(data);
  const parsed = JSON.parse(result);

  assertEquals(typeof parsed.metadata, "object");
});

Deno.test("JsonFormatter should handle complex metadata", () => {
  const formatter = new JsonFormatter();
  const data: FormattedData = {
    parents: [],
    name: "test",
    postfix: "",
    level: Level.INFO,
    msg: "Test message",
    metadata: {
      nested: { key: "value" },
      array: [1, 2, 3],
      number: 42,
    },
  };

  const result = formatter.format(data);
  const parsed = JSON.parse(result);

  assertEquals(parsed.metadata.nested.key, "value");
  assertEquals(Array.isArray(parsed.metadata.array), true);
  assertEquals(parsed.metadata.number, 42);
});
