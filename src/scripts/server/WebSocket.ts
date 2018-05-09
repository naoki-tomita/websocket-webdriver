import * as socketio from "socket.io";
import * as fs from "fs";
import * as https from "https";

let io: socketio.Server;
let socket: socketio.Socket;
let initialized = false;
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
      console.log("Connected with client.");
      initialized = true;
      socket = connectedSocket;
      resolve(socket);
    });
  });
}

export async function send(data: any) {
  if (!initialized) {
    throw Error("WebSocket not initialized.");
  }
  return new Promise(resolve => {
    socket.once("message", data => {
      console.log(`Retrieved: ${data}`);
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
