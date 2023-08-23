import { AbstractFormatter } from './Formatter.ts';
import { FormatterAndTransports, LoggerOptions } from './Logger.ts';
import { AbstractTransport } from './Transport.ts';
import { Level } from './Level.ts';
import { TextFormatter } from './formatters/TextFormatter.ts';
import { TerminalTransport } from './transports/Terminal.ts';

/**
 * OptionsBuilder
 * @class OptionsBuilder
 * @property {string} name
 * @property {Level} level
 * @property {LoggerOptions} parent
 * @property {Level[]} excludedLoggingLevels
 * @property {Transport[]} transports
 */
export class OptionsBuilder {
  name: string | undefined = undefined;
  parent?: LoggerOptions;
  loggingLevel: Level | undefined = undefined;
  excludedLoggingLevels: Level[] = [];
  listOfFormatterAndTransports: FormatterAndTransports[] = [];

  /**
   * Set the name of the logger
   * @param name
   * @returns {OptionsBuilder}
   */
  setName(name: string): OptionsBuilder {
    this.name = name;
    return this;
  }

  /**
   * Exclude a level from the logger
   * @param level
   * @returns {OptionsBuilder}
   */
  excludeLevel(level: Level): OptionsBuilder {
    this.excludedLoggingLevels.push(level);
    return this;
  }

  /**
   * Exclude levels from the logger
   * @param levels
   * @returns {OptionsBuilder}
   */
  excludeLevels(levels: Level[]): OptionsBuilder {
    this.excludedLoggingLevels = this.excludedLoggingLevels.concat(
      levels,
    );
    return this;
  }

  /**
   * Set the minimal level of the logger (default: Level.TRACE)
   * @param level
   * @returns {OptionsBuilder}
   */
  setLoggingLevel(level: Level): OptionsBuilder {
    this.loggingLevel = level;
    return this;
  }

  /**
   * Set the default the logger options
   * @param parent
   * @returns
   */
  inherit(parent: LoggerOptions) {
    this.parent = parent;
    return this;
  }

  /**
   * Add a transport to the logger
   * @param transport
   * @returns {OptionsBuilder}
   */
  addTransport(
    // deno-lint-ignore no-explicit-any
    formatter: AbstractFormatter<any>,
    // deno-lint-ignore no-explicit-any
    transport: AbstractTransport<any>,
  ): OptionsBuilder {
    this.listOfFormatterAndTransports.push({
      formatter,
      transports: [transport],
    });
    return this;
  }

  /**
   * Add transports to the logger
   * @param formatter
   * @param transports
   * @returns {OptionsBuilder}
   */
  addTransports(
    // deno-lint-ignore no-explicit-any
    formatter: AbstractFormatter<any>,
    // deno-lint-ignore no-explicit-any
    transports: AbstractTransport<any>[],
  ): OptionsBuilder {
    this.listOfFormatterAndTransports.push({ formatter, transports });
    return this;
  }

  /**
   * Build the logger options
   * @returns {object} LoggerOptions
   */
  build(): LoggerOptions {
    const listOfFormatterAndTransports = [
      ...this.listOfFormatterAndTransports,
      ...this.parent?.listOfFormatterAndTransports || [],
    ];

    const parents: Array<string> = [];

    if (this.parent) {
      parents.push(...this.parent.parents);
      parents.push(this.parent.name);
    }

    return {
      parents: parents,
      name: this.name || this.parent?.name || 'default',
      loggingLevel: this.parent?.loggingLevel || this.loggingLevel ||
        Level.TRACE,
      excludedLoggingLevels: Array.from(
        new Set([
          ...this.excludedLoggingLevels,
          ...this.parent?.excludedLoggingLevels || [],
        ]),
      ),
      listOfFormatterAndTransports:
        listOfFormatterAndTransports.length
          ? listOfFormatterAndTransports
          : [
            {
              formatter: new TextFormatter(),
              transports: [new TerminalTransport()],
            },
          ],
    };
  }
}
