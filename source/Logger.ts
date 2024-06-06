import { AbstractFormatter } from './Formatter.ts';
import { AbstractTransport } from './Transport.ts';
import { Level } from './Level.ts';
import { OptionsBuilder } from './OptionsBuilder.ts';

export type MessageType = string | TemplateStringsArray;

export type FormatterAndTransports = {
  // deno-lint-ignore no-explicit-any
  formatter: AbstractFormatter<any>;
  // deno-lint-ignore no-explicit-any
  transports: AbstractTransport<any>[];
};

export interface LoggerOptions {
  parents: Array<string>;
  name: string;
  loggingLevel: Level;
  excludedLoggingLevels: Level[];
  listOfFormatterAndTransports: FormatterAndTransports[];
}

/**
 * Logger class for logging messages
 * @class Logger
 * @property {string} name
 * @property {Level} level
 * @property {string} uuid
 */
// deno-lint-ignore ban-types
export class Logger<MT = {}> {
  parents: Array<string> = [];
  name = 'default';
  postfix = '';
  loggingLevel = Level.TRACE;
  uuid = 'ABCDEF';
  listOfFormatterAndTransports: FormatterAndTransports[] = [];

  constructor(
    options: LoggerOptions = new OptionsBuilder().build(),
    postfix: string = '',
  ) {
    this.parents = options.parents;
    this.name = options.name;
    this.postfix = postfix;
    this.loggingLevel = options.loggingLevel;
    this.listOfFormatterAndTransports.push(
      ...options.listOfFormatterAndTransports,
    );
  }

  /**
   * Log
   * @param {Level} level
   * @param {string} text
   * @returns {string}
   */
  def(level: Level, msg: MessageType, metadata: MT): string {
    const msgString = typeof msg === 'object' ? msg.join(' ') : msg;

    this.listOfFormatterAndTransports.forEach((combination) => {
      const data = {
        parents: this.parents,
        name: this.name,
        postfix: this.postfix,
        level,
        msg: msgString,
        metadata,
      };

      const logString = combination.formatter.format(data);

      combination.transports.forEach((transport) => {
        transport.send(level, logString, data);
      });
    });

    return msgString;
  }

  /**
   * Trace
   * @param {string} msg message
   * @returns {string} message
   */
  trc(msg: MessageType, metadata: MT = {} as MT) {
    return this.def(Level.TRACE, msg, metadata);
  }

  /**
   * Debug
   * @param {string} msg message
   * @returns {string} message
   */
  dbg(msg: MessageType, metadata: MT = {} as MT) {
    return this.def(Level.DEBUG, msg, metadata);
  }

  /**
   * Verbose
   * @param {string} msg message
   * @returns {string} message
   */
  vrb(msg: MessageType, metadata: MT = {} as MT) {
    return this.def(Level.VERBOSE, msg, metadata);
  }

  /**
   * Info
   * @param {string} msg message
   * @returns {string} message
   */
  inf(msg: MessageType, metadata: MT = {} as MT) {
    return this.def(Level.INFO, msg, metadata);
  }

  /**
   * User
   * @param {string} msg message
   * @returns {string} message
   */
  usr(msg: MessageType, metadata: MT = {} as MT) {
    return this.def(Level.USER, msg, metadata);
  }

  /**
   * Warn
   * @param {string} msg message
   * @returns {string} message
   */
  wrn(msg: MessageType, metadata: MT = {} as MT) {
    return this.def(Level.WARN, msg, metadata);
  }

  /**
   * Error
   * @param {string} msg message
   * @returns {string} message
   */
  err(msg: MessageType | Error, metadata: MT = {} as MT) {
    if (msg instanceof Error) {
      return this.def(Level.ERROR, msg.message, {
        stack: msg.stack,
        ...metadata,
      });
    } else {
      return this.def(Level.ERROR, msg, metadata);
    }
  }

  /**
   * Fatal
   * @param {string} msg message
   * @returns {string} message
   */
  ftl(msg: MessageType, metadata: MT = {} as MT) {
    return this.def(Level.FATAL, msg, metadata);
  }
}
