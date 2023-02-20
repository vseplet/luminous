export abstract class Transport {
  abstract send(): boolean;
}

export type MessageType = string | TemplateStringsArray;

export interface IFormatOptions {
  name: string;
  level: Level;
  uuid?: string;
  msg: string;
}

export interface ICreateLoggerOptions {
  name?: string;
  level?: Level;
}

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
