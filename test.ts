import { Driver } from "./src/scripts/server";

async function main() {
  const driver = new Driver();
  const browser = await driver.init();
  console.log(await browser.eval(function() {
    return document.getElementById("counter").innerText;
  }));
  await browser.eval(function() {
    document.getElementById("button").click();
    document.getElementById("button").click();
    document.getElementById("button").click();
  });
  console.log(await browser.eval(function() {
    return document.getElementById("counter").innerText;
  }));
  const el = await browser.element("#button");
  await el.click();
  console.log(await browser.eval(function() {
    return document.getElementById("counter").innerText;
  }));
}

main();