import { Level } from './Level.ts';

/**
 * IDataToFormat is the data that is passed to the formatter.
 * The formatter can use this data to format the log message.
 */
export interface IDataForFormatting {
  parents: Array<string>;
  name: string;
  postfix: string;
  level: Level;
  uuid?: string;
  msg: string;
  // deno-lint-ignore no-explicit-any
  metadata?: any;
}

/**
 * AbstractFormatter is the base class for all formatters.
 */
export abstract class AbstractFormatter<
  // deno-lint-ignore no-explicit-any
  O extends { [key: string]: any },
> {
  options: Required<O> = {} as Required<O>;

  constructor(
    options: { [K in keyof O]?: O[K] },
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

  /**
   * format formats the data to a string.
   * @param {IDataToFormat} _data
   * @returns {string} The formatted string.
   */
  abstract format(_data: IDataForFormatting): string;
}
