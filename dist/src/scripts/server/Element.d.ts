export declare function element(selector: string): Element;
export declare class Element {
    readonly selector: string;
    constructor(selector: string);
    isExist(): Promise<boolean>;
    isHidden(): Promise<boolean>;
    isDisabled(): Promise<boolean>;
    waitUntilAppear(): Promise<void>;
    waitUntilVisible(): Promise<void>;
    waitUntilEnable(): Promise<void>;
    waitUntilDisappear(): Promise<void>;
    waitUntilInvisible(): Promise<void>;
    waitUntilDisabled(): Promise<void>;
    waitFor(cb: () => Promise<boolean> | boolean): Promise<void>;
    click(): Promise<{}>;
    getText(): Promise<{}>;
}
