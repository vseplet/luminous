import { printf } from '../deps.ts';
import { TextFormatter } from './formatters/mod.ts';
import { Level, MessageType, Transport } from './types.ts';

interface LoggerOptions {
  name: string;
  loggingLevel: Level;
  parentOptions: LoggerOptions | null;
  excludedLoggingLevels: Level[];
  transports: Transport[];
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
  name = 'default';
  level = Level.TRACE;
  uuid = 'ABCDEF';
  transports: Transport[] = [];
  formatter = new TextFormatter();

  constructor(_options: LoggerOptions) {}

  /**
   * Log
   * @param {Level} level
   * @param {string} text
   * @returns {string}
   */
  def(level: Level, msg: MessageType, metadata: MT): string {
    const logString = this.formatter.format({
      name: this.name,
      level,
      msg: typeof msg === 'object' ? msg.join(' ') : msg,
      metadata,
    });

    printf(logString);
    return logString;
  }

  /**
   * Trace
   * @param {string} msg message
   * @returns {string} message
   */
  trc(msg: MessageType, metadata: MT = {} as MT) {
    console.log(msg);
    console.log(arguments);
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
  err(msg: MessageType, metadata: MT = {} as MT) {
    return this.def(Level.ERROR, msg, metadata);
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
