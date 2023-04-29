"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIdParam = exports.validate = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const changeResponse_1 = require("./../utils/changeResponse");
const regex_1 = require("./../constants/regex");
const validate = 
// @ts-ignore
(schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        });
        next();
    }
    catch (e) {
        const errors = e.inner.reduce(
        // @ts-ignore
        (errors, current) => ({ ...errors, [current.path]: current.errors }), {});
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json((0, changeResponse_1.changeResponse)(false, null, {
            code: http_status_codes_1.StatusCodes.BAD_REQUEST,
            error: true,
            message: (0, http_status_codes_1.getStatusText)(http_status_codes_1.StatusCodes.BAD_REQUEST),
            payload: errors.payload || errors.data || errors,
        }));
    }
};
exports.validate = validate;
const validateIdParam = (req, res, next) => {
    const { id } = req.params;
    if (!id.match(regex_1.objectIdRegex)) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, (0, http_status_codes_1.getStatusText)(http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    next();
};
exports.validateIdParam = validateIdParam;
