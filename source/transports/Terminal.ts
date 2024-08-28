import { Level } from "../Level.ts";
import { AbstractTransport } from "$types";

interface TerminalTransportOptions {
  // TODO: add options
}

/**
 * TerminalTransport
 * @class TerminalTransport
 * @extends Transport
 * @property {boolean} showMetadata
 */
export class TerminalTransport
  extends AbstractTransport<TerminalTransportOptions> {
  constructor(options: TerminalTransportOptions = {}) {
    super(options, {});
  }

  send(level: Level, msg: string): void {
    if (level < Level.ERROR) {
      Deno.stdout.write(new TextEncoder().encode(msg));
    } else {
      Deno.stderr.write(new TextEncoder().encode(msg));
    }
  }
}
