import * as helpers from './src/helpers/mod.ts';
import * as transports from './src/transports/mod.ts';
import * as formatters from './src/formatters/mod.ts';
import { OptionsBuilder } from './src/OptionsBuilder.ts';
import { Logger } from './src/Logger.ts';
import { Level } from './src/Level.ts';

const lucid = {
  helpers,
  Level,
  transports,
  formatters,
  OptionsBuilder,
  Logger,
};

export const log = new Logger(new OptionsBuilder().build());
export default lucid;
