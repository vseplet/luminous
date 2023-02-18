import { printf } from '../deps.ts';
import { formatDate } from './helpers/time.ts';
import {
  colorMessageByLevel,
  Level,
  LevelShortName,
} from './levels.ts';
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
  def(level: Level, text: MessageType): string {
    const msg = typeof text === 'object' ? text.join(' ') : text;
    const time = formatDate(new Date(), 'yyyy-MM-dd HH:mm');
    const log = `${time} [${
      LevelShortName[level]
    }] ${this.name} <${this.uuid}>: ${msg}\n`;

    printf(colorMessageByLevel(level, log));
    return msg;
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
