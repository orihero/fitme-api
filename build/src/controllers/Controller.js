"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const helpers = {
    validate: async (
    // @ts-ignore
    schema, value, options) => {
        try {
            return (await schema.validate(value, {
                abortEarly: false,
                stripUnknown: true,
                ...options,
            })); // not sure when the data can be undefined?
        }
        catch (e) {
            const errors = e.inner.reduce(
            // @ts-ignore
            (errors, current) => ({ ...errors, [current.path]: current.errors }), {});
            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, { payload: { errors } });
        }
    },
};
const Controller = (actions) => actions(helpers);
exports.default = Controller;
