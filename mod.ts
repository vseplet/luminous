import * as helpers from './src/helpers/mod.ts';
import * as transports from './src/transports/mod.ts';
import { createLogger, setDefaultOptions } from './src/lucid.ts';
import { Level } from './src/levels.ts';

export const log = createLogger();

const lucid = {
  setDefaultOptions,
  createLogger,
  helpers,
  transports,
  Level,
};

export default lucid;
