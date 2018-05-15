"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function btoa(str) {
    var buffer = new Buffer(str.toString(), 'binary');
    return buffer.toString('base64');
}
exports.btoa = btoa;
;
function atob(str) {
    return new Buffer(str, 'base64').toString('binary');
}
exports.atob = atob;
//# sourceMappingURL=Binary.js.map