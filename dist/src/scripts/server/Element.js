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
var FunctionEvaluator_1 = require("./FunctionEvaluator");
var Sleep_1 = require("./utils/Sleep");
var Timeout_1 = require("./utils/Timeout");
var Logger_1 = require("../common/utils/Logger");
function element(selector) {
    return new Element(selector);
}
exports.element = element;
var Element = /** @class */ (function () {
    function Element(selector) {
        this.selector = selector;
    }
    Element.prototype.isExist = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isExist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logger_1.Logger.verbose(this.selector + ": isExist");
                        return [4 /*yield*/, FunctionEvaluator_1.evaluate(function (selector) {
                                var el = document.querySelector(selector);
                                return !!el;
                            }, this.selector)];
                    case 1:
                        isExist = _a.sent();
                        return [2 /*return*/, !!isExist];
                }
            });
        });
    };
    Element.prototype.isHidden = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isHidden;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logger_1.Logger.verbose(this.selector + ": isHidden");
                        return [4 /*yield*/, FunctionEvaluator_1.evaluate(function (selector) {
                                var el = document.querySelector(selector);
                                if (el) {
                                    var hidden = el.hidden ||
                                        el.style.display === "none" ||
                                        el.style.visibility === "hidden";
                                    return hidden;
                                }
                                return true;
                            }, this.selector)];
                    case 1:
                        isHidden = _a.sent();
                        return [2 /*return*/, !!isHidden];
                }
            });
        });
    };
    Element.prototype.isDisabled = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isDisabled;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logger_1.Logger.verbose(this.selector + ": isDisabled");
                        return [4 /*yield*/, FunctionEvaluator_1.evaluate(function (selector) {
                                var el = document.querySelector(selector);
                                if (el) {
                                    return el.disabled;
                                }
                                return false;
                            }, this.selector)];
                    case 1:
                        isDisabled = _a.sent();
                        return [2 /*return*/, !!isDisabled];
                }
            });
        });
    };
    Element.prototype.waitUntilAppear = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                Logger_1.Logger.verbose(this.selector + ": waitUntilAppear");
                return [2 /*return*/, this.waitFor(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.isExist()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); })];
            });
        });
    };
    Element.prototype.waitUntilVisible = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                Logger_1.Logger.debug(this.selector + ": waitUntilVisible");
                return [2 /*return*/, this.waitFor(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.isHidden()];
                            case 1: return [2 /*return*/, !(_a.sent())];
                        }
                    }); }); })];
            });
        });
    };
    Element.prototype.waitUntilEnable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                Logger_1.Logger.debug(this.selector + ": waitUntilEnable");
                return [2 /*return*/, this.waitFor(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.isDisabled()];
                            case 1: return [2 /*return*/, !(_a.sent())];
                        }
                    }); }); })];
            });
        });
    };
    Element.prototype.waitUntilDisappear = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                Logger_1.Logger.debug(this.selector + ": waitUntilDisappear");
                return [2 /*return*/, this.waitFor(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.isExist()];
                            case 1: return [2 /*return*/, !(_a.sent())];
                        }
                    }); }); })];
            });
        });
    };
    Element.prototype.waitUntilInvisible = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                Logger_1.Logger.debug(this.selector + ": waitUntilInvisible");
                return [2 /*return*/, this.waitFor(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.isHidden()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); })];
            });
        });
    };
    Element.prototype.waitUntilDisabled = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                Logger_1.Logger.debug(this.selector + ": waitUntilDisabled");
                return [2 /*return*/, this.waitFor(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.isDisabled()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); })];
            });
        });
    };
    Element.prototype.waitFor = function (cb) {
        return __awaiter(this, void 0, void 0, function () {
            var timeout, startTime, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logger_1.Logger.verbose(this.selector + ": waitFor");
                        timeout = Timeout_1.getTimeout();
                        startTime = Date.now();
                        _a.label = 1;
                    case 1: return [4 /*yield*/, cb()];
                    case 2:
                        result = _a.sent();
                        if (result) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, Sleep_1.sleep(500)];
                    case 3:
                        _a.sent();
                        console.log(Date.now() - startTime);
                        if (Date.now() - startTime > timeout) {
                            Logger_1.Logger.error("Wait " + timeout + " ms. but, Specified element not found.");
                            throw Error("Wait " + timeout + " ms. but, Specified element not found.");
                        }
                        _a.label = 4;
                    case 4:
                        if (true) return [3 /*break*/, 1];
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Element.prototype.click = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logger_1.Logger.debug(this.selector + ": click");
                        return [4 /*yield*/, this.waitUntilAppear()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, FunctionEvaluator_1.evaluate(function (selector) {
                                var el = document.querySelector(selector);
                                var event = document.createEvent("Event");
                                event.initEvent("click", true, true);
                                if (el) {
                                    if (el.tagName.toLowerCase() === "a") {
                                        var url = el.getAttribute("href") || "";
                                        location.assign(url);
                                    }
                                    else {
                                        el.dispatchEvent(event);
                                    }
                                }
                            }, this.selector)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, Sleep_1.sleep(500)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Element.prototype.getText = function () {
        return __awaiter(this, void 0, void 0, function () {
            var foundText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logger_1.Logger.debug(this.selector + ": getText");
                        return [4 /*yield*/, this.waitUntilAppear()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, FunctionEvaluator_1.evaluate(function (selector) {
                                var el = document.querySelector(selector);
                                if (el) {
                                    return el.innerText;
                                }
                            }, this.selector)];
                    case 2:
                        foundText = _a.sent();
                        Logger_1.Logger.debug("Found: \"" + foundText + "\"");
                        return [2 /*return*/, foundText];
                }
            });
        });
    };
    Element.prototype.sendKeys = function (keys) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logger_1.Logger.debug(this.selector + ": sendKeys(\"" + keys + "\")");
                        return [4 /*yield*/, this.waitUntilAppear()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, FunctionEvaluator_1.evaluate(function (selector, keys) {
                                var el = document.querySelector(selector);
                                if (el && el.tagName.toLowerCase() === "input") {
                                    el.value = keys;
                                }
                            }, this.selector, keys)];
                }
            });
        });
    };
    return Element;
}());
exports.Element = Element;
//# sourceMappingURL=Element.js.map