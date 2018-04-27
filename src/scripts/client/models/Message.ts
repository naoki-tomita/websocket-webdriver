import { log } from "../utils/Logger";
import { Message } from "../../common/types";

export function parseMessage(message: string): Message {
  try {
    const parsedData = JSON.parse(message);
    const { function: fn, params } = parsedData;
    return {
      function: fn.replace(/\s\s/g, ""),
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

export function procMessage(message: Message) {
  const { function: fn, params } = message;
  try {
    return new Function(fn)().call(window, params);
  } catch (e) {
    log(`Error: ${e.message}`);
  }
}