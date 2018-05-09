import { send } from "./WebSocket";
import { minify } from "uglify-js";

export async function evaluate<T = null>(fn: (param: T) => any, param?: T) {
  return send({
    function: `return (${fn.toString()})`,
    params: param,
  });
}

type AsyncResolver = (result?: any) => void;

export async function evaluateAsync<T = null>(fn: (result: AsyncResolver, param: T) => any, param?: T) {
  return send({
    asyncFunction: `return (${fn.toString()})`,
    params: param,
  });
}
