import * as socketio from "socket.io";
import * as fs from "fs";
import * as https from "https";
import * as http from "http";
import * as path from "path";

import { createRandomString } from "../common/utils/Random";

let io: socketio.Server;
let socket: socketio.Socket | null = null;
let serverSession: string = createRandomString(8);
let clientSession: string | null = null;

async function waitMessage(s: socketio.Socket) {
  return new Promise<string>((r, x) => {
    const y = setTimeout(x, 10000);
    s.once("message", m => {
      clearTimeout(y);
      r(m);
    });
  });
}

export async function initialize() {
  const server = (https || http).createServer({
    key: fs.readFileSync(path.join(__dirname, "./server.key")),
    cert: fs.readFileSync(path.join(__dirname,"./server.crt")),
  });
  console.log("Server listening...");
  server.listen(8081);
  io = socketio.listen(server);
  return new Promise<socketio.Socket>(resolve => {
    io.on("connection", async s => {
      const clSession = await waitMessage(s);
      console.log(`Establish request from: ${clSession}`);
      if (
        (clientSession && clSession !== clientSession) ||
        !clSession
      ) {
        s.disconnect();
      } else {
        clientSession = clSession;
        s.send(serverSession);
      }
      const result = await waitMessage(s);
      if (result === `${serverSession}:${clientSession}`) {
        console.log(`Connected to: ${clSession}`);
        socket = s;
      } else {
        s.disconnect();
      }

      s.once("disconnect", () => {
        socket = null;
      });
      resolve(s);
    });
  });
}

export async function send(data: any) {
  if (!socket) {
    await initialize();
  }
  return new Promise(resolve => {
    (socket as socketio.Socket).once("message", data => {
      try {
        const parsedData = JSON.parse(data);
        resolve(parsedData);
      } catch (e) {
        resolve(data);
      }
    });
    (socket as socketio.Socket).send(JSON.stringify(data));
  });
}
