import * as socketio from "socket.io-client";
import { Message } from "../common/Types";

const io = socketio(`http://${location.hostname}:8081`);

io.on("error", (e: any) => {
  console.error(JSON.stringify(e));
});
io.on("message", (data: string) => {
  const message = parseMessage(data);
  const result = procMessage(message);
  io.send(JSON.stringify(result));
});

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
  return new Function(fn)().call(window, params);
}
