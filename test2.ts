import { initialize, element, setTimeout } from "./src/scripts/server";

async function main() {
  setTimeout(40000);
  await initialize();

  await element("#button").waitUntilAppear();
  console.log(await element("#counter").getText());
  await element("#button").click();
  await element("#button").click();
  await element("#button").click();
  console.log(await element("#counter").getText());
}

main();
