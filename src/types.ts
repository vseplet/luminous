export abstract class Transport {
  abstract send(): boolean;
}

export type MessageType = string | TemplateStringsArray;

export interface LoggerOptions {
  name: string;
  loggingLevel: Level;
  parentOptions: LoggerOptions | null;
  excludedLoggingLevels: Level[];
  transports: Transport[];
}

export interface IFormatOptions {
  name: string;
  level: Level;
  uuid?: string;
  msg: string;
  metadata?: any;
}

export interface ICreateLoggerOptions {
  name?: string;
  level?: Level;
}

export abstract class FormatterAbstract {
  abstract format(): string;
}

export abstract class TransportAbstract {
  abstract addLog(): boolean;
}

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
