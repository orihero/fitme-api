"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generic = exports.notfound = void 0;
var http_errors_1 = __importDefault(require("http-errors"));
var http_status_codes_1 = require("http-status-codes");
var changeResponse_1 = require("./../utils/changeResponse");
var notfound = function (req, res, next) {
    next((0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, (0, http_status_codes_1.getStatusText)(http_status_codes_1.StatusCodes.NOT_FOUND)));
};
exports.notfound = notfound;
var generic = function (err, req, res, next) {
    var isDeveloperError = !err.statusCode;
    var isServerError = err.statusCode >= 500;
    //   LoggerService.error("http error:", [req.url, err]);
    if (isServerError || isDeveloperError) {
        // LoggerService.error(err);
    }
    if (isDeveloperError) {
        err = (0, http_errors_1.default)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
    var code = err.statusCode;
    var response = {
        code: code,
        error: true,
        message: err.message,
        payload: err.payload || err.data,
    };
    res.status(code).json((0, changeResponse_1.changeResponse)(false, null, response));
};
exports.generic = generic;
//# sourceMappingURL=error.js.map