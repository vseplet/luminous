import { Level } from './types.ts';

export interface LoggerOptions {
  name: string;
  level: Level;
  parent: LoggerOptions | null;
}

export class LoggerOptionsBuilder {
  name = 'default';
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

  addTransport() {
    return this;
  }

  build(): LoggerOptions {
    return {
      name: this.name,
      level: this.level,
      parent: this.parent || null,
    };
  }
}
