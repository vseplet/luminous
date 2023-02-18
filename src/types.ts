export abstract class Transport {
  abstract send(): boolean;
}

export type MessageType = string | TemplateStringsArray;
