import { writeFileSync } from "fs";

import { initialize, element, setTimeout, captureScreenShot } from "./src/scripts/server";

async function main() {
  setTimeout(40000);
  await initialize();

  await element("#button").waitUntilAppear();
  const png = await captureScreenShot();
  writeFileSync("./screen.png", png);
}

main();
