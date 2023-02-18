import { Transport } from '../types.ts';

export class FileTransport implements Transport {
  send() {
    return true;
  }
}
