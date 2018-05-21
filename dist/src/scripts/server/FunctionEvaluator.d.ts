export declare function evaluate<T = null>(fn: (param: T) => any, param?: T): Promise<{}>;
export declare type AsyncResolver = (result?: any) => void;
export declare function evaluateAsync<T = null>(fn: (result: AsyncResolver, param: T) => any, param?: T): Promise<{}>;
