import * as socketio from "socket.io-client";

import { Message, isSyncMessage } from "../common/Types";
import { log } from "./utils/Logger";
import { parseMessage, evaluate, evaluateAsync } from "./models/Message";

import "./utils/MonkeyPatch";
import { createRandomString } from "../common/utils/Random";
import { Session } from "./models/Session";

log("WebSocket-Driver loaded.");
const io = socketio(`https://${location.hostname}:8081`);
const session = new Session();

async function messageOnce(message: string) {
  log(`messageOnce: ${message}`);
  return new Promise(resolve => {
    io.once("message", (data: string) => {
      log(`response: ${data}`);
      resolve(data);
    });
    io.send(message);
  });
}

async function establishHandShake() {
  const result = await messageOnce(session.get());
  io.send(`${result}:${session.get()}`);
}

function startDriver() {
  io.on("message", async (data: string) => {
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
    log(`Result: ${JSON.stringify(result).substr(0, 100)}`);
    io.send(JSON.stringify(result));
  });
}

function main() {
  io.on("connect", async () => {
    await establishHandShake();
    startDriver();
  });
  io.on("error", (e: any) => {
    log(`Error: ${JSON.stringify(e)}`);
  });
}

log("start");
main();