import { send } from "./WebSocket";
import { minify } from "uglify-js";

export async function evaluate(fn: (...params: any[]) => any, ...params: any[]) {
  return send({
    function: `return (${fn.toString()})`,
    params: params,
  });
}

export type AsyncResolver = (result?: any) => void;

export async function evaluateAsync<T = null>(fn: (result: AsyncResolver, ...params: any[]) => any, ...params: any[]) {
  return send({
    asyncFunction: `return (${fn.toString()})`,
    params: params,
  });
}
