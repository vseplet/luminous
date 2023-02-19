import { printf } from '../deps.ts';
import { defaultColorizeFormat } from './fomats.ts';
import { Level } from './levels.ts';
import { MessageType, Transport } from './types.ts';

export class Logger {
  name = 'default';
  level = Level.TRACE;
  uuid = 'ABCDEF';
  transports: Transport[] = [];
  formatter = undefined;

  constructor() {}

  /**
   * Log
   * @param {Level} level
   * @param {string} text
   * @returns {string}
   */
  def(level: Level, msg: MessageType): string {
    const logString = defaultColorizeFormat({
      name: this.name,
      level,
      msg: typeof msg === 'object' ? msg.join(' ') : msg,
    });

    printf(logString);
    return logString;
  }

  /**
   * Trace
   * @param {string} msg message
   * @returns {string} message
   */
  trc(msg: MessageType) {
    return this.def(Level.TRACE, msg);
  }

  /**
   * Debug
   * @param {string} msg message
   * @returns {string} message
   */
  dbg(msg: MessageType) {
    return this.def(Level.DEBUG, msg);
  }

  /**
   * Verbose
   * @param {string} msg message
   * @returns {string} message
   */
  vrb(msg: MessageType) {
    return this.def(Level.VERBOSE, msg);
  }

  /**
   * Info
   * @param {string} msg message
   * @returns {string} message
   */
  inf(msg: MessageType) {
    return this.def(Level.INFO, msg);
  }

  /**
   * Warn
   * @param {string} msg message
   * @returns {string} message
   */
  wrn(msg: MessageType) {
    return this.def(Level.WARN, msg);
  }

  /**
   * Error
   * @param {string} msg message
   * @returns {string} message
   */
  err(msg: MessageType) {
    return this.def(Level.ERROR, msg);
  }

  /**
   * Fatal
   * @param {string} msg message
   * @returns {string} message
   */
  ftl(msg: MessageType) {
    return this.def(Level.FATAL, msg);
  }
}
