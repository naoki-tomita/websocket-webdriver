import * as socketio from "socket.io";

let io: socketio.Server;
let socket: socketio.Socket;
let initialized = false;
export async function initialize() {
  io = socketio(8081);
  return new Promise<socketio.Socket>(resolve => {
    io.on("connection", connectedSocket => {
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
