export enum LogLevel {
  VERBOSE = 0,
  DEBUG = 1,
  INFO = 2,
  WARNING = 3,
  ERROR = 4,
};

export const Logger = {
  level: LogLevel.INFO,
  setLevel(level: LogLevel) {
    this.level = level;
  },
  verbose(...args: any[]) {
    if (this.level <= LogLevel.VERBOSE) {
      console.log(...args);
    }
  },
  debug(...args: any[]) {
    if (this.level <= LogLevel.DEBUG) {
      console.log(...args);
    }
  },
  info(...args: any[]) {
    if (this.level <= LogLevel.INFO) {
      console.log(...args);
    }
  },
  warn(...args: any[]) {
    if (this.level <= LogLevel.WARNING) {
      console.warn(...args);
    }
  },
  error(...args: any[]) {
    if (this.level <= LogLevel.ERROR) {
      console.error(...args);
    }
  }
};