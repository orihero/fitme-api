"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeResponse = void 0;
const changeResponse = (success, data, error = null) => ({
    success,
    data,
    error,
});
exports.changeResponse = changeResponse;
