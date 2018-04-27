import { evaluate } from "./FunctionEvaluator";

export class Browser {
  findElement(selector: string) {
    return evaluate<string>((selector) => {
      return document.querySelector(selector);
    }, selector);
  }
}