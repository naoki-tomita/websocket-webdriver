import { parseURL, URLRecord } from "whatwg-url";

export function scriptPath() {
  if (document.currentScript) {
    const src = (document.currentScript as HTMLScriptElement).src;
    const parsedUrl = parseURL(src) || parseURL(location.href) || {} as URLRecord;
  }
  return parseURL(location.href) || {} as URLRecord;
}
