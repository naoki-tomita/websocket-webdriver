export declare function findElement(selector: string): Promise<{}>;
export declare class Browser {
    captureScreenShot(filePath: string): Promise<void>;
    getUrl(path: string): Promise<{}>;
    reload(forceReload?: boolean): Promise<{}>;
}
export declare const browser: Browser;
