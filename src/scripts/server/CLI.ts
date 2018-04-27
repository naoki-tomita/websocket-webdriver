import { initialize, send } from "./WebSocket";
import { scanf as libScanf } from "nodejs-scanf";

export async function cli() {
  console.log("Waiting for connect...");
  await initialize();
  console.log("Connected!");
  while(true) {
    const command = await scanf();
    console.log(await evaluate(command));
  }
}

async function evaluate(command: string) {
  return send({
    function: `return function(){ return ${command} }`,
  });
}

async function scanf() {
  return new Promise<string>(r => libScanf("%s", r));
}