import { send } from "./WebSocket";

export async function evaluate<T>(fn: (param: T) => any, params: T) {
  return send({
    function: `return (${fn.toString()})`,
    params: params,
  });
}
