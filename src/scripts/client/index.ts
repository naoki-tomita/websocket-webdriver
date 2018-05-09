import * as socketio from "socket.io-client";

import { Message, isSyncMessage } from "../common/Types";
import { log } from "./utils/Logger";
import { parseMessage, evaluate, evaluateAsync } from "./models/Message";

import "./utils/MonkeyPatch";

log("WebSocket-Driver loaded.");

function main() {
  const io = socketio(`https://${location.hostname}:8081`);

  io.on("error", (e: any) => {
    log(`Error: ${JSON.stringify(e)}`);
  });
  io.on("message",async (data: string) => {
    log(`Message: ${data}`);
    const message = parseMessage(data);
    let result: any;
    if (isSyncMessage(message)) {
      log(`Sync`);
      result = evaluate({
        function: message.function,
        params: message.params,
      });
    } else {
      log(`Async`);
      result = await evaluateAsync({
        function: message.asyncFunction,
        params: message.params,
      });
    }
    log(`Result: ${result}`);
    io.send(JSON.stringify(result));
  });
}

log("start");
main();