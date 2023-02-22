import { Logger } from './Logger.ts';
import { OptionsBuilder } from './OptionsBuilder.ts';
import { ICreateLoggerOptions, Level } from './types.ts';

const defaultLoggerOptions: ICreateLoggerOptions = {
  name: 'default',
  level: Level.TRACE,
};

export function createOptions(): OptionsBuilder {
  return new OptionsBuilder();
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
