/// <reference types="socket.io" />
import * as socketio from "socket.io";
export declare function initialize(): Promise<socketio.Socket>;
export declare function send(data: any): Promise<{}>;
