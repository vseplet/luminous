import { Logger } from './logger.ts';

export const log = new Logger();

interface ICreateLoggerOptions {
  name: string;
}

export function createLogger(options: ICreateLoggerOptions): Logger {
  const logger = new Logger();
  logger.name = options.name;
  return logger;
}
