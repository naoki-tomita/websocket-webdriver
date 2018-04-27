import { initialize, element, setTimeout } from "./src/scripts/server";

async function main() {
  setTimeout(40000);
  await initialize();

  await element("#cba-start-button").waitUntilAppear();
  await element("#cba-component-file-browse-popup-open-getFile-fileId").click();
  await element("#cba-component-file-browse-popup-getFile-fileId > div > div > div.r-detail-screen__body > div > div > div > div.r-folder-tree__body > ul > li:nth-child(1) > a.r-folder-list-view__button.r-folder-list-view__button--checkbox").click();
  await element("#cba-component-file-browse-popup-ok-getFile-fileId").click();

  console.log(await element("#cba-component-file-browse-popup-open-getFile-fileId > span.r-list-button__value.cba-list-button-clamp-title.r-grid__item.r-grid__item--16").getText());
  await element(".cba-button__job-setting--under-preset-feedback").click()
}

main();
