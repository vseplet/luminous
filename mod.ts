import * as helpers from './src/helpers/mod.ts';
import * as transports from './src/transports/mod.ts';
import * as formatters from './src/formatters/mod.ts';
import { OptionsBuilder } from './src/OptionsBuilder.ts';
import { Logger } from './src/Logger.ts';
import { Level } from './src/types.ts';

const lucid = {
  Logger,
  OptionsBuilder,
  helpers,
  transports,
  formatters,
  Level,
};

export const log = new Logger(new OptionsBuilder().build());
export default lucid;
