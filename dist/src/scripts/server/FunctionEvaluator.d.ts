export declare function evaluate(fn: (...params: any[]) => any, ...params: any[]): Promise<{}>;
export declare type AsyncResolver = (result?: any) => void;
export declare function evaluateAsync<T = null>(fn: (result: AsyncResolver, ...params: any[]) => any, ...params: any[]): Promise<{}>;
