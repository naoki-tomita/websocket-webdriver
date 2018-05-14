import { writeFileSync } from "fs";

import { initialize, element, setTimeout, captureScreenShot } from "./src/scripts/server";

async function main() {
  setTimeout(40000);
  await initialize();

  await element("#button").waitUntilAppear();
  await captureScreenShot();
}

main();
