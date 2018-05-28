import { browser, element, setTimeout, sleep } from "../src/scripts/server";
import { Logger, LogLevel } from "../src/scripts/common/utils/Logger";

describe("Task viewer", () => {
  beforeAll(() => {
    Logger.setLevel(LogLevel.VERBOSE);
    jest.setTimeout(2000000);
  });

  beforeEach(async () => {
    await browser.getUrl("/test/application.html");
  });

  it("should add task successfully", async () => {
    await element(".input > input").sendKeys("Task 1");
    await element(".input > button").click();
    const task1 = await element("#todo > li:nth-child(1) > span").getText();
    expect(task1).toBe("Task 1");
  });

  it("should delete task successfully", async () => {
    await element(".input > input").sendKeys("Task 1");
    await element(".input > button").click();
    const task1 = await element("#todo > li:nth-child(1) > span").getText();
    expect(task1).toBe("Task 1");
    // delete
    await element("#todo > li:nth-child(1) > button").click();
    // shown dialog
    const message = await element(".dialog__body").getText();
    expect(message).toBe("Task 1を削除します。よろしければOKを押してください。");
    await element(".dialog__footer > button").click();
    await element("#todo > li:nth-child(1)").waitUntilDisappear();
  });

  it("should don't add task when click add button input empty.", async () => {
    await element(".input > button").click();
    await element("#todo > li:nth-child(1)").waitUntilDisappear();
  });

  it("should reconnect when click a tag.", async () => {
    const appTitle = await element("h1").getText();
    expect(appTitle).toBe("Task view");
    await element("a").click();
    const page2Title = await element("h1").getText();
    expect(page2Title).toBe("Title text");
  });

  it("should take screenshot", async () => {
    const png: string = await browser.captureScreenShot();
    expect(png.substr(0, 22)).toBe("data:image/png;base64,");
  });
});