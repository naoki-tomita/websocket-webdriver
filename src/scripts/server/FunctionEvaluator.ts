import { send } from "./WebSocket";
import { minify } from "uglify-js";

export async function evaluate<T = null>(fn: (param: T) => any, param?: T) {
  return send({
    function: minify(`return (${fn.toString()})`).code,
    params: param,
  });
}
