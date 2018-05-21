import { Message } from "../../common/Types";
export declare function parseMessage(message: string): Message;
export declare function evaluate(message: {
    function: string;
    params?: any;
}): any;
export declare function evaluateAsync(message: {
    function: string;
    params?: any;
}): Promise<{} | undefined>;
