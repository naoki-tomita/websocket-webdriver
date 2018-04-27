import { initialize, element } from "./src/scripts/server";

async function main() {
  await initialize();
  console.log(await element("#counter").getText());
  await element("#button").click();
  await element("#button").click();
  await element("#button").click();
  console.log(await element("#button").getText());
  console.log(await element("#counter").getText());
}

main();
