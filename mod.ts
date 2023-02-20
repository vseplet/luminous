import * as helpers from './src/helpers/mod.ts';
import * as transports from './src/transports/mod.ts';
import * as formatters from './src/formatters/mod.ts';
import {
  createLogger,
  createOptionsBuilder,
  setDefaultOptions,
} from './src/core.ts';
import { Level } from './src/types.ts';

const lucid = {
  setDefaultOptions,
  createLogger,
  createOptionsBuilder,
  helpers,
  transports,
  formatters,
  Level,
};

export const log = createLogger();
export default lucid;
