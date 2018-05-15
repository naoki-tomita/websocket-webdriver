"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var timeout = 40000;
function setTimeout(ms) {
    timeout = ms;
}
exports.setTimeout = setTimeout;
function getTimeout() {
    return timeout;
}
exports.getTimeout = getTimeout;
//# sourceMappingURL=Timeout.js.map