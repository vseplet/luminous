import { formatDate } from './helpers/time.ts';
import {
  colorMessageByLevel,
  Level,
  LevelShortName,
} from './levels.ts';

interface IFormatOptions {
  name: string;
  level: Level;
  uuid?: string;
  msg: string;
}

export function defaultColorizeFormat(
  options: IFormatOptions,
): string {
  const time = formatDate(new Date(), 'yyyy-MM-dd HH:mm');

  const logString = `${time} [${
    LevelShortName[options.level]
  }] ${options.name} <${options.uuid}>: ${options.msg}\n`;

  return colorMessageByLevel(options.level, logString);
}
