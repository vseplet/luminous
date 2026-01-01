import type {
  FormatterAndTransports,
  LoggerInitOptions,
  LoggerOptions,
} from "$types";
import { Level } from "$/Level.ts";
import { TextFormatter } from "$/formatters/TextFormatter.ts";
import { TerminalTransport } from "$/transports/Terminal.ts";

export type MessageType = string | TemplateStringsArray;

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
  name = "default";
  postfix = "";
  loggingLevel = Level.TRACE;
  uuid = "ABCDEF";
  listOfFormatterAndTransports: FormatterAndTransports[] = [];

  constructor(
    options?: LoggerInitOptions | LoggerOptions | string,
    postfix?: string,
  ) {
    // Если передан string, это name
    if (typeof options === "string") {
      this.name = options;
      this.postfix = postfix || "";
      this.listOfFormatterAndTransports.push(Logger.getDefaultTransports());
      return;
    }

    // Если передан LoggerOptions (старый формат)
    if (options && "listOfFormatterAndTransports" in options) {
      const opts = options as LoggerOptions;
      this.parents = opts.parents;
      this.name = opts.name;
      this.postfix = postfix || "";
      this.loggingLevel = opts.loggingLevel;
      this.listOfFormatterAndTransports.push(
        ...opts.listOfFormatterAndTransports,
      );

      if (this.listOfFormatterAndTransports.length === 0) {
        this.listOfFormatterAndTransports.push(Logger.getDefaultTransports());
      }
      return;
    }

    // Новый формат LoggerInitOptions
    const initOptions = (options || {}) as LoggerInitOptions;
    this.name = initOptions.name || "default";
    this.postfix = initOptions.postfix || postfix || "";
    this.loggingLevel = initOptions.level || Level.TRACE;

    // Добавляем транспорты, если указаны
    if (initOptions.formatter && initOptions.transport) {
      const transports = Array.isArray(initOptions.transport)
        ? initOptions.transport
        : [initOptions.transport];
      this.listOfFormatterAndTransports.push({
        formatter: initOptions.formatter,
        transports,
      });
    } else {
      // Применяем дефолтные транспорты, если их нет
      this.listOfFormatterAndTransports.push(Logger.getDefaultTransports());
    }
  }

  /**
   * Get default formatter and transport
   * @returns {FormatterAndTransports}
   */
  static getDefaultTransports(): FormatterAndTransports {
    return {
      formatter: new TextFormatter(),
      transports: [new TerminalTransport()],
    };
  }

  /**
   * Log
   * @param {Level} level
   * @param {string} text
   * @returns {string}
   */
  def(level: Level, msg: MessageType, metadata: MT): string {
    const msgString = typeof msg === "object" ? msg.join(" ") : msg;

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
  trc(msg: MessageType, metadata: MT = {} as MT): string {
    return this.def(Level.TRACE, msg, metadata);
  }

  /**
   * Debug
   * @param {string} msg message
   * @returns {string} message
   */
  dbg(msg: MessageType, metadata: MT = {} as MT): string {
    return this.def(Level.DEBUG, msg, metadata);
  }

  /**
   * Verbose
   * @param {string} msg message
   * @returns {string} message
   */
  vrb(msg: MessageType, metadata: MT = {} as MT): string {
    return this.def(Level.VERBOSE, msg, metadata);
  }

  /**
   * Info
   * @param {string} msg message
   * @returns {string} message
   */
  inf(msg: MessageType, metadata: MT = {} as MT): string {
    return this.def(Level.INFO, msg, metadata);
  }

  /**
   * User
   * @param {string} msg message
   * @returns {string} message
   */
  usr(msg: MessageType, metadata: MT = {} as MT): string {
    return this.def(Level.USER, msg, metadata);
  }

  /**
   * Warn
   * @param {string} msg message
   * @returns {string} message
   */
  wrn(msg: MessageType, metadata: MT = {} as MT): string {
    return this.def(Level.WARN, msg, metadata);
  }

  /**
   * Error
   * @param {string} msg message
   * @returns {string} message
   */
  err(msg: MessageType | Error, metadata: MT = {} as MT): string {
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
  ftl(msg: MessageType, metadata: MT = {} as MT): string {
    return this.def(Level.FATAL, msg, metadata);
  }

  /**
   * Create a child logger
   * @param name - Child logger name
   * @param options - Optional child logger options or postfix string
   * @returns {Logger}
   */
  child(
    name: string,
    options?: LoggerInitOptions | string,
  ): Logger {
    // Если options - строка, это postfix
    if (typeof options === "string") {
      const childOptions: LoggerOptions = {
        parents: [...this.parents, this.name],
        name,
        loggingLevel: this.loggingLevel,
        excludedLoggingLevels: [],
        listOfFormatterAndTransports: [...this.listOfFormatterAndTransports],
      };
      return new Logger(childOptions, options);
    }

    // Если options - объект или undefined
    const initOptions = (options || {}) as LoggerInitOptions;
    const childOptions: LoggerOptions = {
      parents: [...this.parents, this.name],
      name,
      loggingLevel: initOptions.level || this.loggingLevel,
      excludedLoggingLevels: initOptions.excludedLevels || [],
      listOfFormatterAndTransports:
        initOptions.formatter && initOptions.transport
          ? [{
            formatter: initOptions.formatter,
            transports: Array.isArray(initOptions.transport)
              ? initOptions.transport
              : [initOptions.transport],
          }]
          : [...this.listOfFormatterAndTransports],
    };

    return new Logger(childOptions, initOptions.postfix || "");
  }
}
