"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Random_1 = require("../../common/utils/Random");
var KEY_SESSION = "WS-D-session";
var Session = /** @class */ (function () {
    function Session() {
        if (!localStorage.getItem(KEY_SESSION)) {
            localStorage.setItem(KEY_SESSION, Random_1.createRandomString(8));
        }
        this.session = localStorage.getItem(KEY_SESSION) || "";
    }
    Session.prototype.get = function () {
        return this.session;
    };
    return Session;
}());
exports.Session = Session;
//# sourceMappingURL=Session.js.map