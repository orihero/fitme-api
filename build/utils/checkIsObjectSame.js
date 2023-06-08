"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsObjectSame = void 0;
var checkIsObjectSame = function (obj1, obj2) {
    var obj1Keys = Object.keys(obj1);
    var obj2Keys = Object.keys(obj2);
    if (obj1Keys.length !== obj2Keys.length) {
        return false;
    }
    var obj1Values = Object.values(obj1);
    var obj2Values = Object.values(obj2);
    if (obj1Values.length !== obj2Values.length) {
        return false;
    }
    var _loop_1 = function (i) {
        if (!obj2Keys.find(function (a) { return a === obj1Keys[i]; })) {
            return { value: false };
        }
        if (!obj2Values.find(function (a) { return a === obj1Values[i]; })) {
            return { value: false };
        }
    };
    for (var i = 0; i < obj1Keys.length; i++) {
        var state_1 = _loop_1(i);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    return true;
};
exports.checkIsObjectSame = checkIsObjectSame;
//# sourceMappingURL=checkIsObjectSame.js.map