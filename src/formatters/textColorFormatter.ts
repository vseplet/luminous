import { colorStringByLevel } from '../helpers/color.ts';
import { formatDate } from '../helpers/time.ts';
import { IFormatOptions, LevelShortName } from '../types.ts';

export function defaultColorizeFormat(
  options: IFormatOptions,
): string {
  const time = formatDate(new Date(), 'yyyy-MM-dd HH:mm');

  const logString = `${time} [${
    LevelShortName[options.level]
  }] ${options.name} <${options.uuid}>: ${options.msg}\n`;

  return colorStringByLevel(options.level, logString);
}
