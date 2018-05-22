import * as socketio from "socket.io-client";
import { Session } from "./Session";
import { log } from "../utils/Logger";
import { parseMessage, evaluate, evaluateAsync } from "./Message";
import { isSyncMessage } from "../../common/Types";

let io: SocketIOClient.Socket;
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
  log("Starting establish handshake.");
  const result = await messageOnce(session.get());
  io.send(`${result}:${session.get()}`);
  log("Success to establish.");
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
    log(`Result: ${(JSON.stringify(result) || "").substr(0, 100)}`);
    io.send(JSON.stringify(result));
  });
}

export function initialize() {
  io = socketio(`https://${location.hostname}:8081`)
  io.on("connect", async () => {
    await establishHandShake();
    startDriver();
  });
  io.on("error", (e: any) => {
    log(`Error: ${JSON.stringify(e)}`);
  });
}