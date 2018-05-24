export declare function findElement(selector: string): Promise<{}>;
export declare class Browser {
    captureScreenShot(filePath: string): Promise<void>;
    getUrl(path: string): Promise<void>;
    reload(forceReload: boolean): Promise<void>;
}
export declare const browser: Browser;
