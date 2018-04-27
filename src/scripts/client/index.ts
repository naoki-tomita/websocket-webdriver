import * as socketio from "socket.io-client";
import { Message } from "../common/Types";
import { log } from "./utils/Logger";
import { parseMessage, procMessage } from "./models/Message";

log("WebSocket-Driver loaded.");

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