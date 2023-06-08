"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeResponse = void 0;
var changeResponse = function (success, data, error) {
    if (error === void 0) { error = null; }
    return ({
        success: success,
        data: data,
        error: error,
    });
};
exports.changeResponse = changeResponse;
//# sourceMappingURL=changeResponse.js.map