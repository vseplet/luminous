/**
 * Type definitions for Luminous logging library
 *
 * This module contains all type definitions, interfaces, and abstract classes
 * used throughout the Luminous library.
 *
 * @module
 */

import type { Level } from "$/Level.ts";

/**
 * Data structure passed to formatters containing all log information
 */
export type FormattedData = {
  /** Hierarchy of parent logger names */
  parents: Array<string>;
  /** Logger name */
  name: string;
  /** Optional postfix appended to logger output */
  postfix: string;
  /** Log level */
  level: Level;
  /** Optional unique identifier for the log entry */
  uuid?: string;
  /** Log message */
  msg: string;
  /** Optional metadata attached to the log entry */
  // deno-lint-ignore no-explicit-any
  metadata?: any;
};

/**
 * Combination of a formatter and its associated transports
 */
export type FormatterAndTransports = {
  /** Formatter instance */
  // deno-lint-ignore no-explicit-any
  formatter: AbstractFormatter<any>;
  /** Array of transport instances */
  // deno-lint-ignore no-explicit-any
  transports: AbstractTransport<any>[];
};

/**
 * Complete logger options used internally
 */
export interface LoggerOptions {
  /** Hierarchy of parent logger names */
  parents: Array<string>;
  /** Logger name */
  name: string;
  /** Minimum logging level */
  loggingLevel: Level;
  /** Levels to exclude from logging */
  excludedLoggingLevels: Level[];
  /** Formatter and transport combinations */
  listOfFormatterAndTransports: FormatterAndTransports[];
}

/**
 * Simple options for creating a logger
 */
export interface LoggerInitOptions {
  /** Logger name (default: "default") */
  name?: string;
  /** Minimum logging level (default: Level.TRACE) */
  level?: Level;
  /** Optional postfix appended to logger output */
  postfix?: string;
  /** Custom formatter instance */
  // deno-lint-ignore no-explicit-any
  formatter?: AbstractFormatter<any>;
  /** Transport instance or array of transports */
  // deno-lint-ignore no-explicit-any
  transport?: AbstractTransport<any> | AbstractTransport<any>[];
  /** Levels to exclude from logging */
  excludedLevels?: Level[];
}

/**
 * Base class for all transports
 *
 * Transports are responsible for sending formatted log messages to their destination
 * (e.g., terminal, file, remote service).
 *
 * @template O - Transport options type
 */
export abstract class AbstractTransport<
  // deno-lint-ignore no-explicit-any
  O extends { [key: string]: any },
> {
  /** Transport options merged with defaults */
  options: Required<O> = {} as Required<O>;

  constructor(
    options: { [K in keyof O]?: O[K] } = {},
    defaultOptions: Required<O>,
  ) {
    this.options = defaultOptions;
    for (const [key, value] of Object.entries(options)) {
      if (this.options[key] !== undefined) {
        // deno-lint-ignore ban-ts-comment
        // @ts-ignore
        this.options[key] = value;
      }
    }
  }

  /**
   * Send a log message to the transport destination
   *
   * @param level - Log level
   * @param log - Formatted log string
   * @param data - Original log data
   */
  abstract send(
    level: Level,
    log: string,
    data: FormattedData,
  ): void;
}

/**
 * Base class for all formatters
 *
 * Formatters convert log data into formatted strings for output.
 * They receive structured log data and produce human-readable or machine-readable strings.
 *
 * @template O - Formatter options type
 */
export abstract class AbstractFormatter<
  // deno-lint-ignore no-explicit-any
  O extends { [key: string]: any },
> {
  /** Formatter options merged with defaults */
  options: Required<O> = {} as Required<O>;

  constructor(
    options: { [K in keyof O]?: O[K] },
    defaultOptions: Required<O>,
  ) {
    this.options = defaultOptions;
    for (const [key, value] of Object.entries(options)) {
      if (this.options[key] !== undefined) {
        // deno-lint-ignore ban-ts-comment
        // @ts-ignore
        this.options[key] = value;
      }
    }
  }

  /**
   * Format log data to a string
   *
   * @param _data - Structured log data
   * @returns Formatted log string
   */
  abstract format(_data: FormattedData): string;
}
