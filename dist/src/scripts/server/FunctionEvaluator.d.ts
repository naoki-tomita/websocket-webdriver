export declare function evaluate(fn: (...params: any[]) => any, ...params: any[]): Promise<any>;
export declare type AsyncResolver = (result?: any) => void;
export declare function evaluateAsync(fn: (result: AsyncResolver, ...params: any[]) => any, ...params: any[]): Promise<any>;
