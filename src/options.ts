import { Level } from './levels.ts';

export interface LoggerOptions {
  name: string;
  level: Level;
}

export class LoggerOptionsBuilder {
  name = '';
  parent?: LoggerOptions;
  level = Level.TRACE;

  setName(name: string) {
    this.name = name;
    return this;
  }

  setLevel(level: Level) {
    this.level = level;
    return this;
  }

  setParent(parent: LoggerOptions) {
    this.parent = parent;
    return this;
  }

  build(): LoggerOptions {
    return {
      name: this.name,
      level: this.level,
    };
  }
}
