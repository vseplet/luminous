import { Formatter, IDataToFormat } from '../Formatter.ts';
import { formatDate } from '../helpers/time.ts';

/**
 * IJsonFormatterOptions
 * @interface IJsonFormatterOptions
 * @property {string} timestampPattern - default 'yyyy-MM-dd HH:mm:ss'
 */
interface IJsonFormatterOptions {
  timestampPattern: string;
}

const defaultOptions: IJsonFormatterOptions = {
  timestampPattern: 'yyyy-MM-dd HH:mm:ss',
};

/**
 * JsonFormatter
 * @class JsonFormatter
 * @extends Formatter
 * @property {IJsonFormatterOptions} options
 */
export class JsonFormatter extends Formatter<IJsonFormatterOptions> {
  constructor(options = defaultOptions) {
    super(options, defaultOptions);
  }

  format(data: IDataToFormat): string {
    const time = formatDate(
      new Date(),
      this.options.timestampPattern,
    );

    return JSON.stringify({
      time,
      ...data,
    });
  }
}
