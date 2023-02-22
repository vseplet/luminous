import { Level, LoggerOptions } from './types.ts';

/**
 * OptionsBuilder
 * @class OptionsBuilder
 * @property {string} name
 * @property {Level} level
 * @property {LoggerOptions} parent
 */
export class OptionsBuilder {
  name = 'default';
  parent?: LoggerOptions;
  loggingLevel = Level.TRACE;
  excludedLoggingLevels: Level[] = [];

  /**
   * Set the name of the logger
   * @param name
   * @returns
   */
  setName(name: string) {
    this.name = name;
    return this;
  }

  /**
   * Exclude a level from the logger
   * @param level
   * @returns
   */
  excludeLevel(level: Level) {
    this.excludedLoggingLevels.push(level);
    return this;
  }

  /**
   * Exclude levels from the logger
   * @param levels
   * @returns
   */
  excludeLevels(levels: Level[]) {
    this.excludedLoggingLevels = this.excludedLoggingLevels.concat(
      levels,
    );
    return this;
  }

  /**
   * Set the minimal level of the logger (default: Level.TRACE)
   * @param level
   * @returns
   */
  setLoggingLevel(level: Level) {
    this.loggingLevel = level;
    return this;
  }

  /**
   * Set the default the logger options
   * @param parent
   * @returns
   */
  setDefaultOptions(parent: LoggerOptions) {
    this.parent = parent;
    return this;
  }

  /**
   * @returns
   */
  addTransport() {
    return this;
  }

  /**
   * Build the logger options
   * @returns {object} LoggerOptions
   */
  build(): LoggerOptions {
    return {
      name: this.name,
      loggingLevel: this.loggingLevel,
      parentOptions: this.parent || null,
      excludedLoggingLevels: [],
      transports: [],
    };
  }
}
