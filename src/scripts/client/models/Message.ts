import { log, error } from "../utils/Logger";
import { Message } from "../../common/Types";

export function parseMessage(message: string): Message {
  try {
    const parsedData = JSON.parse(message);
    const {
      function: fn,
      asyncFunction: afn,
      params,
    } = parsedData;
    if (fn) {
      return {
        function: fn,
        params,
      }
    } else {
      return {
        asyncFunction: afn,
        params,
      }
    }
  } catch (e) {
    error(e.message);
    throw e;
  }
}

export function evaluate(message: {
  function: string;
  params: any[];
}) {
  const { function: fn, params } = message;
  try {
    return new Function(fn)().apply(window, params);
  } catch (e) {
    error(e.message);
    error(message.function);
    error(JSON.stringify(message.params));
  }
}

export async function evaluateAsync(message: {
  function: string;
  params: any[];
}) {
  const { function: fn, params } = message;
  try {
    return new Promise(resolve => {
      new Function(fn)().apply(window, resolve, params);
    });
  } catch (e) {
    error(e.message);
    error(message.function);
    error(JSON.stringify(message.params));
  }
}
