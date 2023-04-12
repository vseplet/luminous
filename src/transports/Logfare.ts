import { AbstractTransport } from '../Transport.ts';
import { Level } from '../Level.ts';
import { IDataForFormatting } from '../Formatter.ts';

interface LogfareTransportOptions {
  source: string;
  xApiKey: string;
  hostName?: string;
}

/**
 * LogfareTransport
 * @class LogfareTransport
 * @extends Transport
 * @property {boolean} showMetadata
 */
export class LogfareTransport
  extends AbstractTransport<LogfareTransportOptions> {
  constructor(options: LogfareTransportOptions) {
    super(options, {
      source: '',
      xApiKey: '',
      hostName: 'unknown',
    });
  }

  send(_level: Level, msg: string, data: IDataForFormatting): void {
    try {
      fetch(
        'https://api.logflare.app/api/logs',
        {
          method: 'POST',
          headers: {
            'X-API-KEY': this.options.xApiKey,
            'Content-Type': 'application/json',
            'User-Agent':
              `Cloudflare Worker via ${this.options.hostName}`,
          },
          body: JSON.stringify({
            source: this.options.source,
            event_message: msg,
            level: _level,
            metadata: data,
          }),
        },
      ).catch((e) => console.error(e));
    } catch (e: unknown) {
      console.error(e);
    }
  }
}
