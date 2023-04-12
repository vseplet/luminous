import { IDataForFormatting } from './Formatter.ts';
import { Level } from './Level.ts';

export abstract class AbstractTransport<
  // deno-lint-ignore no-explicit-any
  O extends { [key: string]: any },
> {
  options: Required<O> = {} as Required<O>;

  constructor(
    options: { [K in keyof O]?: O[K] } = {},
    defaultOptions: Required<O>,
  ) {
    this.options = defaultOptions;
    for (const [key, value] of Object.entries(options)) {
      if (this.options[key] !== undefined) {
        // deno-lint-ignore ban-ts-comment
        // @ts-ignore
        this.options[key] = value;
      }
    }
  }

  abstract send(
    level: Level,
    log: string,
    data: IDataForFormatting,
  ): void;
}
