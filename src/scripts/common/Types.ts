export type Message = SyncMessage | AsyncMessage;

export interface SyncMessage {
  function: string;
  params?: any;
}

export interface AsyncMessage {
  asyncFunction: string;
  params?: any;
}

export function isSyncMessage(message: Message): message is SyncMessage {
  return !!(message as any).function;
}