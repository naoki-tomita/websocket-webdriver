import * as html2canvas from "html2canvas";
import { evaluate, evaluateAsync } from "./FunctionEvaluator";

export async function findElement(selector: string) {
  return evaluate<string>(selector => {
    return document.querySelector(selector);
  }, selector);
}

export async function captureScreenShot() {
  return evaluateAsync(result => {
    html2canvas(document.body)
    .then(canvas => {
      result(canvas.toDataURL());
    })
    .catch(e => {
      result("ERROR");
    });
  });
}