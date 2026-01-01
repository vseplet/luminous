import { assertEquals } from "@std/assert";
import { TerminalTransport } from "../../source/transports/Terminal.ts";
import { Level } from "../../source/Level.ts";

Deno.test("TerminalTransport should send messages below ERROR to stdout", () => {
  const transport = new TerminalTransport();
  const levels = [
    Level.TRACE,
    Level.DEBUG,
    Level.VERBOSE,
    Level.INFO,
    Level.USER,
    Level.WARN,
  ];

  for (const level of levels) {
    // Capture stdout
    const originalWrite = Deno.stdout.write;
    let written = false;

    Deno.stdout.write = (data: Uint8Array): Promise<number> => {
      written = true;
      return originalWrite.call(Deno.stdout, data);
    };

    transport.send(level, "Test message");

    // Restore original
    Deno.stdout.write = originalWrite;

    assertEquals(written, true);
  }
});

Deno.test("TerminalTransport should send ERROR and FATAL to stderr", () => {
  const transport = new TerminalTransport();
  const levels = [Level.ERROR, Level.FATAL];

  for (const level of levels) {
    // Capture stderr
    const originalWrite = Deno.stderr.write;
    let written = false;

    Deno.stderr.write = (data: Uint8Array): Promise<number> => {
      written = true;
      return originalWrite.call(Deno.stderr, data);
    };

    transport.send(level, "Test message");

    // Restore original
    Deno.stderr.write = originalWrite;

    assertEquals(written, true);
  }
});

Deno.test("TerminalTransport should be instantiable", () => {
  const transport = new TerminalTransport();
  assertEquals(transport instanceof TerminalTransport, true);
});
