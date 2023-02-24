import { Level } from './types.ts';

export interface IDataToFormat {
  name: string;
  level: Level;
  uuid?: string;
  msg: string;
  metadata?: any;
}

export class Formatter<O extends { [key: string]: any }> {
  options: O = {} as O;

  constructor(
    options: { [K in keyof O]?: O[K] },
    defaultOptions: O,
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

  format(_data: IDataToFormat): string {
    return '';
  }
}
