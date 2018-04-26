import * as WebSocket from "ws";
import { MessageType, Message } from "../common/types";
import { Element, ElementFinder } from "./Element";
import { Locator } from "./Locator";

export class Browser {
  ws: WebSocket;
  finder: ElementFinder;
  constructor(websocket: WebSocket) {
    this.ws = websocket;
    this.finder = new ElementFinder(this);
  }

  async eval(script: string | ((...params: any[]) => any), ...params: any[]) {
    return this.procMessage({
      type: MessageType.EVAL,
      data: typeof script === "function" ? `return ${script.toString()}` : script,
      additionalData: params,
    });
  }

  async element(locator: Locator) {
    return this.finder.find(locator);
  }

  async procMessage(message: Message) {
    return new Promise<WebSocket.Data>(resolve => {
      this.ws.once("message", (response: WebSocket.Data) => {
        resolve(response);
      });
      const { type, data, additionalData } = message;
      this.ws.send(JSON.stringify({
        type,
        data,
        additionalData,
      }));
    });
  }
}