import * as helpers from './src/helpers/mod.ts';
import * as transports from './src/transports/mod.ts';
import {
  createLogger,
  createOptionsBuilder,
  setDefaultOptions,
} from './src/core.ts';
import { Level } from './src/levels.ts';

export const log = createLogger();

const lucid = {
  setDefaultOptions,
  createLogger,
  createOptionsBuilder,
  helpers,
  transports,
  Level,
};

export default lucid;
