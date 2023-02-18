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

export const LevelShortName = {
  [Level.TRACE]: 'TRC',
  [Level.DEBUG]: 'DBG',
  [Level.VERBOSE]: 'VRB',
  [Level.INFO]: 'INF',
  [Level.WARN]: 'WRN',
  [Level.ERROR]: 'ERR',
  [Level.FATAL]: 'FTL',
};

/**
 * Colorize log `message` by `level`;
 * @param {Level} level
 * @param {string} message
 * @returns {string} colorized log message
 */
export const colorMessageByLevel = (
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
