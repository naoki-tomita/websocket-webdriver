"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var socketio = require("socket.io-client");
var Session_1 = require("./Session");
var Logger_1 = require("../utils/Logger");
var Message_1 = require("./Message");
var Types_1 = require("../../common/Types");
var io;
var session = new Session_1.Session();
function messageOnce(message) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            Logger_1.log("messageOnce: " + message);
            return [2 /*return*/, new Promise(function (resolve) {
                    io.once("message", function (data) {
                        Logger_1.log("response: " + data);
                        resolve(data);
                    });
                    io.send(message);
                })];
        });
    });
}
function establishHandShake() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Logger_1.log("Starting establish handshake.");
                    return [4 /*yield*/, messageOnce(session.get())];
                case 1:
                    result = _a.sent();
                    io.send(result + ":" + session.get());
                    Logger_1.log("Success to establish.");
                    return [2 /*return*/];
            }
        });
    });
}
function startDriver() {
    var _this = this;
    io.on("message", function (data) { return __awaiter(_this, void 0, void 0, function () {
        var message, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Logger_1.log("Message: " + data);
                    message = Message_1.parseMessage(data);
                    if (!Types_1.isSyncMessage(message)) return [3 /*break*/, 1];
                    Logger_1.log("Sync");
                    result = Message_1.evaluate({
                        function: message.function,
                        params: message.params,
                    });
                    return [3 /*break*/, 3];
                case 1:
                    Logger_1.log("Async");
                    return [4 /*yield*/, Message_1.evaluateAsync({
                            function: message.asyncFunction,
                            params: message.params,
                        })];
                case 2:
                    result = _a.sent();
                    _a.label = 3;
                case 3:
                    Logger_1.log("Result: " + (JSON.stringify(result) || "").substr(0, 100));
                    io.send(JSON.stringify(result));
                    return [2 /*return*/];
            }
        });
    }); });
}
function initialize() {
    var _this = this;
    io = socketio(location.protocol + "//" + location.hostname + ":8081");
    io.on("connect", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, establishHandShake()];
                case 1:
                    _a.sent();
                    startDriver();
                    return [2 /*return*/];
            }
        });
    }); });
    io.on("error", function (e) {
        Logger_1.log("Error: " + JSON.stringify(e));
    });
}
exports.initialize = initialize;
//# sourceMappingURL=Driver.js.map