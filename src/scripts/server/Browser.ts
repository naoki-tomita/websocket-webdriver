import { evaluate, evaluateAsync } from "./FunctionEvaluator";
import { writeFileSync } from "fs";

declare const html2canvas: Html2CanvasStatic;

export async function findElement(selector: string) {
  return evaluate(selector => {
    return document.querySelector(selector);
  }, selector);
}

export async function captureScreenShot(filePath: string) {
  const png = await evaluateAsync(result => {
    html2canvas(document.body)
    .then(canvas => {
      result(canvas.toDataURL());
    })
    .catch(e => {
      result("ERROR");
    });
  });
  writeFileSync(filePath, new Buffer((png as string).replace("data:image/png;base64,", ""), "base64"));
}
