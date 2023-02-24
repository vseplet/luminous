import { Formatter } from '../Formatter.ts';
import { Transport } from '../Transport.ts';

interface TerminalTransportOptions {
  fortmatter?: Formatter<any>;
}

/**
 * TerminalTransport
 * @class TerminalTransport
 * @extends Transport
 * @property {boolean} showMetadata
 */
export class TermianlTransport
  extends Transport<TerminalTransportOptions> {
  constructor(options: TerminalTransportOptions) {
    super(options);
  }

  addLogString(logString: string): void {
    console.log(logString);
  }
}
