/**
 * Luminous - A highly configurable logger for Deno
 *
 * This is the main entrypoint for the Luminous logging library.
 * It provides a simple and flexible way to log events with various severity levels,
 * hierarchical loggers, and customizable formatters.
 *
 * @module
 *
 * @example
 * ```ts
 * import luminous from "jsr:@vseplet/luminous";
 *
 * const log = new luminous.Logger("MyApp");
 * log.inf(`Hello, World!`);
 * ```
 */

import * as helpers from "$helpers";
import * as transports from "$/transports/mod.ts";
import * as formatters from "$/formatters/mod.ts";
import { OptionsBuilder } from "$/OptionsBuilder.ts";
import { Logger } from "$/Logger.ts";
import { Level } from "$/Level.ts";

const luminous = {
  helpers,
  Level,
  transports,
  formatters,
  OptionsBuilder,
  Logger,
};

/**
 * Default logger instance ready to use
 *
 * @example
 * ```ts
 * import { log } from "jsr:@vseplet/luminous";
 *
 * log.inf`Application started`;
 * ```
 */
export const log: Logger = new Logger();
export { Level, Logger, OptionsBuilder };
export default luminous;
