import { parseURL, URLRecord } from "whatwg-url";
import { environment } from "./Environment";

export function scriptPath() {
  if (document.currentScript) {
    const src = (document.currentScript as HTMLScriptElement).src;
    const parsedUrl = parseURL(src) || parseURL(environment.location.href) || {} as URLRecord;
  }
  return parseURL(environment.location.href) || {} as URLRecord;
}
