import { TextFormatter } from '../formatters/TextFormatter.ts';
import { AbstractTransport } from '../Transport.ts';
import { Level } from '../Level.ts';

interface TerminalTransportOptions {
  // TODO: add options
}

/**
 * TerminalTransport
 * @class TerminalTransport
 * @extends Transport
 * @property {boolean} showMetadata
 */
export class TermianlTransport
  extends AbstractTransport<TerminalTransportOptions> {
  constructor(options: TerminalTransportOptions = {}) {
    super(options, {
      formatter: new TextFormatter({
        showMetadata: false,
      }),
    });
  }

  send(level: Level, msg: string): void {
    if (level < Level.ERROR) {
      Deno.stdout.write(new TextEncoder().encode(msg));
    } else {
      Deno.stderr.write(new TextEncoder().encode(msg));
    }
  }
}
