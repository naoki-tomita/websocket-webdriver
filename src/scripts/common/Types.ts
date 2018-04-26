export enum MessageType {
  EVAL = "eval",
  ELEMENT = "element",
  UNKNOWN = "unknown",
}

export interface ElementInfo {
  id: string;
  tag: string;
  classNames: string[];
  html: string;
}

export interface Message {
  type: MessageType;
  data?: string;
  additionalData?: any;
}