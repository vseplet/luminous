import { AbstractFormatter, IDataToFormat } from '../Formatter.ts';
import { formatDate } from '../helpers/time.ts';

/**
 * IJsonFormatterOptions
 * @interface IJsonFormatterOptions
 * @property {string} timestampPattern - default 'yyyy-MM-dd HH:mm:ss'
 */
interface IJsonFormatterOptions {
  timestampPattern?: string;
}

/**
 * JsonFormatter
 * @class JsonFormatter
 * @extends Formatter
 * @property {IJsonFormatterOptions} options
 */
export class JsonFormatter
  extends AbstractFormatter<IJsonFormatterOptions> {
  constructor(options = {}) {
    super(options, {
      timestampPattern: 'yyyy-MM-dd HH:mm:ss',
    });
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
