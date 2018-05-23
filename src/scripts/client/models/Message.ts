import { log } from "../utils/Logger";
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
    return {
      function: (() => {
        console.log("failed to evaluate");
      }).toString(),
    };
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
    log(`Error: ${e.message}`);
  }
}

export async function evaluateAsync(message: {
  function: string;
  params?: any;
}) {
  const { function: fn, params } = message;
  try {
    return new Promise(resolve => {
      new Function(fn)().apply(window, resolve, params);
    });
  } catch (e) {
    log(`Error: ${e.message}`);
  }
}
