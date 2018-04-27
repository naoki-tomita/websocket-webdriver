import { initialize, send } from "./WebSocket";
import * as scanf from "scanf";

export async function cli() {
  console.log("Waiting for connect...");
  await initialize();
  console.log("Connected!");
  while(true) {
    const command = scanf("%s");
    console.log(await evaluate(command));
  }
}

async function evaluate(command: string) {
  return send({
    function: `return function(){ return ${command} }`,
  });
}