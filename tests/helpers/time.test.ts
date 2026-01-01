import { assertEquals } from "@std/assert";
import { formatDate, getCurrentDateInTimezone } from "../../source/helpers/time.ts";

Deno.test("formatDate should format date with yyyy-MM-dd pattern", () => {
  const date = new Date("2023-12-25T10:30:00");
  const result = formatDate(date, "yyyy-MM-dd");
  assertEquals(result, "2023-12-25");
});

Deno.test("formatDate should format date with HH:mm:ss pattern", () => {
  const date = new Date("2023-12-25T10:30:45");
  const result = formatDate(date, "HH:mm:ss");
  assertEquals(result, "10:30:45");
});

Deno.test("formatDate should format date with full pattern", () => {
  const date = new Date("2023-12-25T10:30:45");
  const result = formatDate(date, "yyyy-MM-dd HH:mm:ss");
  assertEquals(result, "2023-12-25 10:30:45");
});

Deno.test("formatDate should pad single digit values with zeros", () => {
  const date = new Date("2023-01-05T05:03:02");
  const result = formatDate(date, "yyyy-MM-dd HH:mm:ss");
  assertEquals(result, "2023-01-05 05:03:02");
});

Deno.test("formatDate should format milliseconds with SSS pattern", () => {
  const date = new Date("2023-12-25T10:30:45.123");
  const result = formatDate(date, "HH:mm:ss.SSS");
  assertEquals(result, "10:30:45.123");
});

Deno.test("formatDate should pad milliseconds with zeros", () => {
  // Create date with exactly 5 milliseconds
  const date = new Date("2023-12-25T10:30:45");
  date.setMilliseconds(5);
  const result = formatDate(date, "HH:mm:ss.SSS");
  assertEquals(result, "10:30:45.005");
});

Deno.test("formatDate should handle complex pattern", () => {
  const date = new Date("2023-12-25T10:30:45.123");
  const result = formatDate(date, "yyyy-MM-dd HH:mm:ss.SSS");
  assertEquals(result, "2023-12-25 10:30:45.123");
});

Deno.test("getCurrentDateInTimezone should return Date object", () => {
  const result = getCurrentDateInTimezone("Europe/Moscow");
  assertEquals(result instanceof Date, true);
});

Deno.test("getCurrentDateInTimezone should handle different timezones", () => {
  const moscow = getCurrentDateInTimezone("Europe/Moscow");
  const london = getCurrentDateInTimezone("Europe/London");
  
  assertEquals(moscow instanceof Date, true);
  assertEquals(london instanceof Date, true);
});

