import { Level } from './types.ts';
import { Logger } from './logger.ts';
import { LoggerOptionsBuilder } from './options.ts';
import { ICreateLoggerOptions } from './types.ts';

let defaultLoggerOptions: ICreateLoggerOptions = {
  name: 'default',
  level: Level.TRACE,
};

export function setDefaultOptions(options: ICreateLoggerOptions) {
  defaultLoggerOptions = options;
}

export function createLogger(
  options: ICreateLoggerOptions = defaultLoggerOptions,
): Logger {
  const logger = new Logger();

  logger.name = options.name || defaultLoggerOptions.name ||
    'default';
  logger.level = options.level || defaultLoggerOptions.level || 0;

  return logger;
}

export function createOptionsBuilder(): LoggerOptionsBuilder {
  return new LoggerOptionsBuilder();
}
