"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generic = exports.notfound = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const changeResponse_1 = require("./../utils/changeResponse");
const notfound = (req, res, next) => {
    next((0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, (0, http_status_codes_1.getStatusText)(http_status_codes_1.StatusCodes.NOT_FOUND)));
};
exports.notfound = notfound;
const generic = (err, req, res, next) => {
    const isDeveloperError = !err.statusCode;
    const isServerError = err.statusCode >= 500;
    //   LoggerService.error("http error:", [req.url, err]);
    if (isServerError || isDeveloperError) {
        // LoggerService.error(err);
    }
    if (isDeveloperError) {
        err = (0, http_errors_1.default)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
    const code = err.statusCode;
    const response = {
        code,
        error: true,
        message: err.message,
        payload: err.payload || err.data,
    };
    res.status(code).json((0, changeResponse_1.changeResponse)(false, null, response));
};
exports.generic = generic;
