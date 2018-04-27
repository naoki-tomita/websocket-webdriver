declare module "nodejs-scanf" {
  function scanf(format: string, callback: (...param: any[]) => void): void;
}