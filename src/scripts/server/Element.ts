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

  async waitUntilAppear() {
    const timeout = getTimeout();
    const startTime = Date.now();
    do {
      const isExist = await evaluate<string>(selector => {
        const el = document.querySelector(selector);
        return !!el;
      }, this.selector);
      if (isExist) {
        return;
      }
      await sleep(500);
      console.log(Date.now() - startTime);
      if (Date.now() - startTime > timeout) {
        throw Error(`Wait ${timeout} ms. but, Specified element not found.`);
      }
    } while(true);
  }

  async click() {
    await this.waitUntilAppear();
    return evaluate<string>(selector => {
      const el = document.querySelector(selector);
      const event = document.createEvent("Event");
      event.initEvent("click", true, true);
      if (el) {
        el.dispatchEvent(event);
      }
    }, this.selector);
  }

  isDisabled() {

  }

  async getText() {
    await this.waitUntilAppear();
    return evaluate<string>(selector => {
      const el = document.querySelector(selector);
      if (el) {
        return (el as HTMLElement).innerText;
      }
    }, this.selector);
  }
}