import { evaluate, evaluateAsync } from "./FunctionEvaluator";
import { writeFileSync } from "fs";
import { sleep } from "./utils/Sleep";

declare const html2canvas: Html2CanvasStatic;

export async function findElement(selector: string) {
  return evaluate(selector => {
    return document.querySelector(selector);
  }, selector);
}

export class Browser {
  async captureScreenShot(filePath: string) {
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

  async getUrl(path: string) {
    await evaluate((path: string) => {
      setTimeout(() => {
        location.assign(path);
      }, 100);
    }, path);
    await sleep(1000);
  }

  async reload(forceReload?: boolean) {
    await evaluate((forceReload?: boolean) => {
      setTimeout(() => {
        location.reload(forceReload);
      }, 100);
    }, forceReload);
    await sleep(1000);
  }
}

export const browser =  new Browser();
