import { colors } from '../../deps.ts';
import { Level } from '../Level.ts';

/**
 * Color string by level of log message (for console)
 * @param level
 * @param message
 * @returns string with ANSI color codes
 */
export const colorStringByLevel = (
  level: Level,
  message: string,
): string => {
  return {
    [Level.TRACE]: colors.gray,
    [Level.DEBUG]: colors.blue,
    [Level.VERBOSE]: colors.cyan,
    [Level.INFO]: colors.green,
    [Level.USER]: colors.white,
    [Level.WARN]: colors.yellow,
    [Level.ERROR]: colors.magenta,
    [Level.FATAL]: colors.bgBrightRed,
  }[level](message);
};
