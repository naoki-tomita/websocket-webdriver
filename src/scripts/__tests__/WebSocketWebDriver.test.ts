jest.mock("socket.io");
jest.mock("socket.io-client");
jest.mock("https");

import * as serverIO from "socket.io";
import * as clientIO from "socket.io-client";
import * as https from "https";
import { initialize as serverInit } from "../server";
import { initialize as clientInit } from "../client/models/Driver";

class Observable {
  onceEv: {
    [key: string]: Array<(...params: Array<any>) => void>;
  } = {};
  events: {
    [key: string]: Array<(...params: Array<any>) => void>;
  } = {};
  on(type: string, fn: (...params: Array<any>) => void) {
    this.events[type] = this.events[type] = [];
    this.events[type].push(fn);
  }
  once(type: string, fn: (...params: Array<any>) => void) {
    this.onceEv[type] = this.onceEv[type] = [];
    this.onceEv[type].push(fn);
  }
  trigger(type: string, ...params: Array<any>) {
    if (this.events[type]) {
      this.events[type].forEach(e => e(...params));
    }
    if (this.onceEv[type]) {
      const ev = this.onceEv[type];
      this.onceEv[type] = [];
      ev.forEach(e => e(...params));
    }
  }
}

class Server extends Observable {
  client: Client;
  send(msg: string) {
    console.log(`send: svr -> clt: ${msg}`);
    this.client.trigger("message", msg);
  }
}

class Client extends Observable {
  server: Server;
  send(msg: string) {
    console.log(`send: clt -> svr: ${msg}`);
    this.server.trigger("message", msg);
  }
}

describe("WebSocket webdriver", () => {
  describe("Initialize", () => {
    const svr = new Server();
    const clt = new Client();
    svr.client = clt;
    clt.server = svr;
    beforeAll(() => {
      ((serverIO.listen as any) as jest.Mock).mockReturnValue(svr);
      ((clientIO as any) as jest.Mock).mockReturnValue(clt);
      ((https.createServer as any) as jest.Mock).mockReturnValue({
        listen() {}
      });
    });
    it("should initialize", async () => {
      clientInit();
      const server = serverInit();
      svr.trigger("connection", svr);
      clt.trigger("connect", clt);
      await server;
    });
  });
});