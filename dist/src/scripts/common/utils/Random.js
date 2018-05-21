"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function createRandomString(size) {
    return Array(size).fill(null).map(function () { return MAP[Math.floor(Math.random() * MAP.length)]; }).join("");
}
exports.createRandomString = createRandomString;
//# sourceMappingURL=Random.js.map