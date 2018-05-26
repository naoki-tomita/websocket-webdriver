export declare enum LogLevel {
    VERBOSE = 0,
    DEBUG = 1,
    INFO = 2,
    WARNING = 3,
    ERROR = 4,
}
export declare const Logger: {
    level: LogLevel;
    setLevel(level: LogLevel): void;
    verbose(...args: any[]): void;
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
};
