import { Level } from './levels.ts';

export abstract class Transport {
  abstract send(): boolean;
}

export type MessageType = string | TemplateStringsArray;

export interface IFormatOptions {
  name: string;
  level: Level;
  uuid?: string;
  msg: string;
}
