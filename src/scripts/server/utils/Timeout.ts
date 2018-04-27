let timeout: number = 40000;
export function setTimeout(ms: number) {
  timeout = ms;
}

export function getTimeout() {
  return timeout;
}
