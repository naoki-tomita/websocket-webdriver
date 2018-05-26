export declare function findElement(selector: string): Promise<any>;
export declare class Browser {
    captureScreenShot(filePath?: string): Promise<any>;
    getUrl(path: string): Promise<void>;
    reload(forceReload?: boolean): Promise<void>;
}
export declare const browser: Browser;
