"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSeconds = void 0;
var getSeconds = function (str) {
    if (str === void 0) { str = "60"; }
    var expTime = 0;
    var arr = str.split("*");
    for (var i = 0; i < arr.length; i++) {
        if (!expTime) {
            expTime = 1;
        }
        expTime *= Number(arr[i].trim());
    }
    return expTime;
};
exports.getSeconds = getSeconds;
//# sourceMappingURL=getSeconds.js.map