import * as helpers from './helpers/mod.ts';
import * as transports from './transports/mod.ts';
import * as formatters from './formatters/mod.ts';
import { OptionsBuilder } from './OptionsBuilder.ts';
import { Logger } from './Logger.ts';
import { Level } from './Level.ts';

const luminous = {
  helpers,
  Level,
  transports,
  formatters,
  OptionsBuilder,
  Logger,
};

export const log = new Logger();
export default luminous;
