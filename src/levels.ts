import { colors } from '../deps.ts';

export enum Level {
  TRACE,
  DEBUG,
  VERBOSE,
  INFO,
  WARN,
  ERROR,
  FATAL,
}

export const colorLevel = (
  level: Level,
  message: string,
): string => {
  return {
    [Level.TRACE]: colors.gray,
    [Level.DEBUG]: colors.blue,
    [Level.VERBOSE]: colors.cyan,
    [Level.INFO]: colors.green,
    [Level.WARN]: colors.yellow,
    [Level.ERROR]: colors.magenta,
    [Level.FATAL]: colors.bgBrightRed,
  }[level](message);
};
