import * as socketio from "socket.io-client";
import { Message } from "../common/Types";

log("WebSocket-Driver loaded.");

function log(message: string) {
  console.log(`[WS-D]${message}`);
}

function parseMessage(message: string): Message {
  try {
    const parsedData = JSON.parse(message);
    const { function: fn, params } = parsedData;
    return {
      function: fn,
      params,
    };
  } catch (e) {
    return {
      function: (() => {
        console.log("failed to evaluate");
      }).toString(),
    };
  }
}

function procMessage(message: Message) {
  const { function: fn, params } = message;
  try {
    return new Function(fn)().call(window, params);
  } catch (e) {
    log(`Error: ${e.message}`);
  }
}

function main() {
  const io = socketio(`https://${location.hostname}:8081`);

  io.on("error", (e: any) => {
    log(`Error: ${JSON.stringify(e)}`);
  });
  io.on("message", (data: string) => {
    log(`Message: ${data}`);
    const message = parseMessage(data);
    log(`ParsedMessage: ${data}`);
    const result = procMessage(message);
    log(`Result: ${result}`);
    io.send(JSON.stringify(result));
  });
}

log("start");
main();