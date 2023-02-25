import {
  AbstractFormatter,
  IDataForFormatting,
} from '../Formatter.ts';
import { colorStringByLevel } from '../helpers/color.ts';
import { formatDate } from '../helpers/time.ts';
import { LevelShortName } from '../Level.ts';

/**
 * ITextFormatterOptions
 * @interface ITextFormatterOptions
 * @property {boolean} colorize - default true
 * @property {boolean} showMetadata - default true
 * @property {string} timestampPattern - default 'yyyy-MM-dd HH:mm:ss'
 */
interface ITextFormatterOptions {
  showMetadata?: boolean;
  colorize?: boolean;
  timestampPattern?: string;
}

/**
 * TextFormatter
 * @class TextFormatter
 * @extends Formatter
 * @property {ITextFormatterOptions} options
 */
export class TextFormatter
  extends AbstractFormatter<ITextFormatterOptions> {
  constructor(options = {}) {
    super(options, {
      showMetadata: false,
      colorize: true,
      timestampPattern: 'HH:mm:ss',
    });
  }

  format(data: IDataForFormatting): string {
    const time = formatDate(
      new Date(),
      this.options.timestampPattern,
    );

    const meta = Object.keys(data.metadata).length > 0 &&
        this.options.showMetadata
      ? JSON.stringify(data.metadata, null, 2)
      : '';

    const logString = `${time} [${
      LevelShortName[data.level]
    }] ${data.name}${
      data.uuid ? ` <${data.uuid}>` : ''
    }: ${data.msg} ${meta}\n`;

    return this.options.colorize
      ? colorStringByLevel(data.level, logString)
      : logString;
  }
}
