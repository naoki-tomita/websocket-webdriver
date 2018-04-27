import { evaluate } from "./FunctionEvaluator";

export function element(selector: string) {
  return new Element(selector);
}

export class Element {
  readonly selector: string;
  constructor(selector: string) {
    this.selector = selector;
  }

  async click() {
    return evaluate<string>(selector => {
      var el = document.querySelector(selector);
      if (el) {
        (el as HTMLElement).click();
      }
    }, this.selector);
  }

  isDisabled() {

  }

  async getText() {
    return evaluate<string>(selector => {
      var el = document.querySelector(selector);
      if (el) {
        return (el as HTMLElement).innerText;
      }
    }, this.selector);
  }
}