"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var http_errors_1 = __importDefault(require("http-errors"));
var http_status_codes_1 = require("http-status-codes");
var authenticate = function (req, res, next) {
    return passport_1.default.authenticate("jwt", { session: false }, function (error, user) {
        if (error) {
            return next(error);
        }
        if (!user) {
            return next((0, http_errors_1.default)(http_status_codes_1.StatusCodes.UNAUTHORIZED));
        }
        req.login(user, function (err) {
            if (err) {
                return next(err);
            }
            return next();
        });
    })(req, res, next);
};
exports.default = authenticate;
//# sourceMappingURL=authenticate.js.map