import { assertEquals } from "@std/assert";
import { Level, LevelShortName } from "../source/Level.ts";

Deno.test("Level enum should have correct values", () => {
  assertEquals(Level.TRACE, 0);
  assertEquals(Level.DEBUG, 1);
  assertEquals(Level.VERBOSE, 2);
  assertEquals(Level.INFO, 3);
  assertEquals(Level.USER, 4);
  assertEquals(Level.WARN, 5);
  assertEquals(Level.ERROR, 6);
  assertEquals(Level.FATAL, 7);
});

Deno.test("LevelShortName should map correctly to level values", () => {
  assertEquals(LevelShortName[Level.TRACE], "TRC");
  assertEquals(LevelShortName[Level.DEBUG], "DBG");
  assertEquals(LevelShortName[Level.VERBOSE], "VRB");
  assertEquals(LevelShortName[Level.INFO], "INF");
  assertEquals(LevelShortName[Level.USER], "USR");
  assertEquals(LevelShortName[Level.WARN], "WRN");
  assertEquals(LevelShortName[Level.ERROR], "ERR");
  assertEquals(LevelShortName[Level.FATAL], "FTL");
});

Deno.test("Level values should be in ascending order", () => {
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

  for (let i = 0; i < levels.length - 1; i++) {
    assertEquals(levels[i] < levels[i + 1], true);
  }
});
