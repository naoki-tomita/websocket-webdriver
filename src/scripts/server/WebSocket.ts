import * as socketio from "socket.io";
import * as fs from "fs";
import * as https from "https";

import { createRandomString } from "../common/utils/Random";

let io: socketio.Server;
let socket: socketio.Socket;
let initialized = false;
let sessionId: string = createRandomString(8);
let session: string | null = null;

export async function initialize() {
  const server = https.createServer({
    key: fs.readFileSync("./server.key"),
    cert: fs.readFileSync("./server.crt"),
  });
  console.log("Server listening...");
  server.listen(8081);
  io = socketio.listen(server);
  return new Promise<socketio.Socket>(resolve => {
    io.on("connection", connectedSocket => {
      connectedSocket.once("message", clSession => {
        console.log(`Establish request from: ${clSession}`);
        connectedSocket.once("message", pass => {
          console.log(`Connected to: ${session}`);
          if (pass === `${sessionId}:${session}`) {
            initialized = true;
            socket = connectedSocket;
            resolve(socket);
          } else {
            connectedSocket.disconnect();
          }
        });
        if (
          (session && clSession !== session) ||
          !clSession
        ) {
          connectedSocket.disconnect();
        } else {
          session = clSession;
          connectedSocket.send(sessionId);
        }
      });
    });
  });
}

export async function send(data: any) {
  if (!initialized) {
    throw Error("WebSocket not initialized.");
  }
  return new Promise(resolve => {
    socket.once("message", data => {
      try {
        const parsedData = JSON.parse(data);
        resolve(parsedData);
      } catch (e) {
        resolve(data);
      }
    });
    socket.send(JSON.stringify(data));
  });
}
