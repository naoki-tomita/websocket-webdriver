import * as WebSocket from "ws";
import { MessageType } from "../common/types";
import { Browser } from "./Browser";

export class Driver {
  wss: WebSocket.Server;
  browser: Browser;
  async init() {
    this.wss = new WebSocket.Server({ port: 8081 });
    return new Promise<Browser>(resolve => {
      this.wss.on("connection", ws => {
        this.browser = new Browser(ws);
        resolve(this.browser);
      });
    });
  }
}
