import { evaluate } from "./FunctionEvaluator";
import { sleep } from "./utils/Sleep";
import { getTimeout } from "./utils/Timeout";

export function element(selector: string) {
  return new Element(selector);
}

export class Element {
  readonly selector: string;
  constructor(selector: string) {
    this.selector = selector;
  }

  async isExist() {
    const isExist = await evaluate(selector => {
      const el = document.querySelector(selector);
      return !!el;
    }, this.selector);
    return !!isExist;
  }

  async isHidden() {
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
    return this.waitFor(async () => await this.isExist());
  }

  async waitUntilVisible() {
    return this.waitFor(async () => !(await this.isHidden()));
  }

  async waitUntilEnable() {
    return this.waitFor(async () => !(await this.isDisabled()));
  }

  async waitUntilDisappear() {
    return this.waitFor(async () => !(await this.isExist()));
  }

  async waitUntilInvisible() {
    return this.waitFor(async () => await this.isHidden());
  }

  async waitUntilDisabled() {
    return this.waitFor(async () => await this.isDisabled());
  }

  async waitFor(cb: () => Promise<boolean> | boolean) {
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
        throw Error(`Wait ${timeout} ms. but, Specified element not found.`);
      }
    } while (true);
  }

  async click() {
    await this.waitUntilAppear();
    return evaluate(selector => {
      const el = document.querySelector(selector);
      const event = document.createEvent("Event");
      event.initEvent("click", true, true);
      if (el) {
        el.dispatchEvent(event);
      }
    }, this.selector);
  }

  async getText() {
    await this.waitUntilAppear();
    return evaluate(selector => {
      const el = document.querySelector(selector);
      if (el) {
        return (el as HTMLElement).innerText;
      }
    }, this.selector);
  }

  async sendKeys(keys: string) {
    await this.waitUntilAppear();
    return evaluate((selector, keys) => {
      const el = document.querySelector(selector);
      if (el && (el as HTMLElement).tagName.toLowerCase() === "input") {
        (el as HTMLInputElement).value = keys;
      }
    }, this.selector, keys);
  }
}