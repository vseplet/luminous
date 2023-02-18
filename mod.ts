import * as helpers from './src/helpers/mod.ts';
import * as transports from './src/transports/mod.ts';
export { log } from './src/lucid.ts';
import { createLogger } from './src/lucid.ts';
import { Level } from './src/levels.ts';

const lucid = {
  createLogger,
  helpers,
  transports,
  Level,
};

export default lucid;
