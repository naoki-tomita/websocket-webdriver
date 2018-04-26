import { Browser } from "./Browser";
import { Locator } from "./Locator";
import { MessageType, ElementInfo } from "../common/types";

export class ElementFinder {
  browser: Browser;
  constructor(browser: Browser) {
    this.browser = browser;
  }

  async find(selector: Locator) {
    const foundElement = await this.browser.procMessage({
      type: MessageType.ELEMENT,
      data: selector,
    });
    if (foundElement) {
      return new Element(this.browser, selector);
    }
  }
}

export class Element {
  browser: Browser;
  selector: string;
  constructor(browser: Browser, selector: string) {
    this.browser = browser;
    this.selector = selector;
  }

  async click() {
    await this.browser.eval(function(selector) {
      const el = document.querySelector(selector) as HTMLElement;
      el.click();
    }, this.selector);
  }
}