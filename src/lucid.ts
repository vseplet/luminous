import { printf } from '../deps.ts';
import {
  colorMessageByLevel,
  Level,
  LevelShortName,
} from './levels.ts';

type LogMessageType = string | TemplateStringsArray;

export class Lucid {
  name = 'Main';

  constructor() {
  }

  log(level: Level, text: LogMessageType) {
    const msg = typeof text === 'object' ? text.join(' ') : text;
    const logFrom = new Error().stack?.split('\n')[3];
    printf(
      `${LevelShortName[level]} ${
        colorMessageByLevel(level, msg)
      } ${logFrom}\n`,
    );
  }

  trace(text: LogMessageType) {
    this.log(Level.TRACE, text);
  }

  debug(text: LogMessageType) {
    this.log(Level.DEBUG, text);
  }

  verbose(text: LogMessageType) {
    this.log(Level.VERBOSE, text);
  }

  info(text: LogMessageType) {
    this.log(Level.INFO, text);
  }

  warn(text: LogMessageType) {
    this.log(Level.WARN, text);
  }

  error(text: LogMessageType) {
    this.log(Level.ERROR, text);
  }

  fatal(text: LogMessageType) {
    this.log(Level.FATAL, text);
  }
}

export class LucidBuilder {
  lucid = new Lucid();

  constructor() {
  }

  setName(name: string) {
    this.lucid.name = name;
    return this;
  }

  build(): Lucid {
    return this.lucid;
  }
}

export class LucidSettings {
}

const logger = new LucidBuilder()
  .setName('Main')
  .build();

logger.trace('this is trace log');
logger.debug('this is debug log');
logger.verbose('this is verbose log');
logger.info('this is info log');
logger.warn('this is warn log');
logger.error('this is error log');
logger.fatal('this is fatal log');
