import { evaluate } from "./FunctionEvaluator";
import { sleep } from "./utils/Sleep";
import { getTimeout } from "./utils/Timeout";
import { Logger } from "../common/utils/Logger";

export function element(selector: string) {
  return new Element(selector);
}

export class Element {
  readonly selector: string;
  constructor(selector: string) {
    this.selector = selector;
  }

  async isExist() {
    Logger.verbose(`${this.selector}: isExist`);
    const isExist = await evaluate(selector => {
      const el = document.querySelector(selector);
      return !!el;
    }, this.selector);
    return !!isExist;
  }

  async isHidden() {
    Logger.verbose(`${this.selector}: isHidden`);
    const isHidden = await evaluate(selector => {
      const el = document.querySelector(selector);
      if (el) {
        const hidden = (el as HTMLElement).hidden ||
                       (el as HTMLElement).style.display === "none" ||
                       (el as HTMLElement).style.visibility === "hidden";
        return hidden;
      }
      return true;
    }, this.selector);
    return !!isHidden;
  }

  async isDisabled() {
    Logger.verbose(`${this.selector}: isDisabled`);
    const isDisabled = await evaluate(selector => {
      const el = document.querySelector(selector);
      if (el) {
        return (el as any).disabled;
      }
      return false;
    }, this.selector);
    return !!isDisabled;
  }

  async waitUntilAppear() {
    Logger.verbose(`${this.selector}: waitUntilAppear`);
    return this.waitFor(async () => await this.isExist());
  }

  async waitUntilVisible() {
    Logger.debug(`${this.selector}: waitUntilVisible`);
    return this.waitFor(async () => !(await this.isHidden()));
  }

  async waitUntilEnable() {
    Logger.debug(`${this.selector}: waitUntilEnable`);
    return this.waitFor(async () => !(await this.isDisabled()));
  }

  async waitUntilDisappear() {
    Logger.debug(`${this.selector}: waitUntilDisappear`);
    return this.waitFor(async () => !(await this.isExist()));
  }

  async waitUntilInvisible() {
    Logger.debug(`${this.selector}: waitUntilInvisible`);
    return this.waitFor(async () => await this.isHidden());
  }

  async waitUntilDisabled() {
    Logger.debug(`${this.selector}: waitUntilDisabled`);
    return this.waitFor(async () => await this.isDisabled());
  }

  async waitFor(cb: () => Promise<boolean> | boolean) {
    Logger.verbose(`${this.selector}: waitFor`);
    const timeout = getTimeout();
    const startTime = Date.now();
    do {
      const result = await cb();
      if (result) {
        return;
      }
      await sleep(500);
      console.log(Date.now() - startTime);
      if (Date.now() - startTime > timeout) {
        Logger.error(`Wait ${timeout} ms. but, Specified element not found.`);
        throw Error(`Wait ${timeout} ms. but, Specified element not found.`);
      }
    } while (true);
  }

  async click() {
    Logger.debug(`${this.selector}: click`);
    await this.waitUntilAppear();
    await evaluate(selector => {
      const el = document.querySelector(selector) as HTMLElement;
      const event = document.createEvent("Event");
      event.initEvent("click", true, true);
      if (el) {
        if (el.tagName.toLowerCase() === "a") {
          const url = el.getAttribute("href") || "";
          location.assign(url);
        } else {
          el.dispatchEvent(event);
        }
      }
    }, this.selector);
    await sleep(500);
  }

  async getText() {
    Logger.debug(`${this.selector}: getText`);
    await this.waitUntilAppear();
    const foundText = await evaluate(selector => {
      const el = document.querySelector(selector);
      if (el) {
        return (el as HTMLElement).innerText;
      }
    }, this.selector);
    Logger.debug(`Found: "${foundText}"`);
    return foundText;
  }

  async sendKeys(keys: string) {
    Logger.debug(`${this.selector}: sendKeys("${keys}")`);
    await this.waitUntilAppear();
    return evaluate((selector, keys) => {
      const el = document.querySelector(selector);
      if (el && (el as HTMLElement).tagName.toLowerCase() === "input") {
        (el as HTMLInputElement).value = keys;
      }
    }, this.selector, keys);
  }
}