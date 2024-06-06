/**
 * Level - The level of the log message
 */

export enum Level {
  TRACE,
  DEBUG,
  VERBOSE,
  INFO,
  USER,
  WARN,
  ERROR,
  FATAL,
}

/**
 * LevelName - The short name of the level
 */
export const LevelShortName = {
  [Level.TRACE]: 'TRC',
  [Level.DEBUG]: 'DBG',
  [Level.VERBOSE]: 'VRB',
  [Level.INFO]: 'INF',
  [Level.USER]: 'USR',
  [Level.WARN]: 'WRN',
  [Level.ERROR]: 'ERR',
  [Level.FATAL]: 'FTL',
};
