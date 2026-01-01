import { assertEquals } from "@std/assert";
import { colorStringByLevel } from "../../source/helpers/color.ts";
import { Level } from "../../source/Level.ts";

Deno.test("colorStringByLevel should return colored string for TRACE", () => {
  const result = colorStringByLevel(Level.TRACE, "test message");
  assertEquals(typeof result, "string");
  assertEquals(result.length > 0, true);
});

Deno.test("colorStringByLevel should return colored string for DEBUG", () => {
  const result = colorStringByLevel(Level.DEBUG, "test message");
  assertEquals(typeof result, "string");
  assertEquals(result.length > 0, true);
});

Deno.test("colorStringByLevel should return colored string for VERBOSE", () => {
  const result = colorStringByLevel(Level.VERBOSE, "test message");
  assertEquals(typeof result, "string");
  assertEquals(result.length > 0, true);
});

Deno.test("colorStringByLevel should return colored string for INFO", () => {
  const result = colorStringByLevel(Level.INFO, "test message");
  assertEquals(typeof result, "string");
  assertEquals(result.length > 0, true);
});

Deno.test("colorStringByLevel should return colored string for USER", () => {
  const result = colorStringByLevel(Level.USER, "test message");
  assertEquals(typeof result, "string");
  assertEquals(result.length > 0, true);
});

Deno.test("colorStringByLevel should return colored string for WARN", () => {
  const result = colorStringByLevel(Level.WARN, "test message");
  assertEquals(typeof result, "string");
  assertEquals(result.length > 0, true);
});

Deno.test("colorStringByLevel should return colored string for ERROR", () => {
  const result = colorStringByLevel(Level.ERROR, "test message");
  assertEquals(typeof result, "string");
  assertEquals(result.length > 0, true);
});

Deno.test("colorStringByLevel should return colored string for FATAL", () => {
  const result = colorStringByLevel(Level.FATAL, "test message");
  assertEquals(typeof result, "string");
  assertEquals(result.length > 0, true);
});

Deno.test("colorStringByLevel should handle all levels", () => {
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
    const result = colorStringByLevel(level, "test");
    assertEquals(typeof result, "string");
    assertEquals(result.length > 0, true);
  }
});
