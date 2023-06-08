"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var jwt_1 = __importDefault(require("../config/jwt"));
var JWTService = {
    signAccessToken: function (subject, payload) {
        var _a = jwt_1.default.Options, issuer = _a.issuer, audience = _a.audience, secretOrKey = _a.secretOrKey;
        return new Promise(function (resolve, reject) {
            (0, jsonwebtoken_1.sign)(payload, secretOrKey, {
                issuer: issuer,
                audience: audience,
                subject: String(subject),
                expiresIn: jwt_1.default.TTL,
            }, function (error, token) {
                if (error) {
                    return reject(error);
                }
                resolve(token || "");
            });
        });
    },
    signRefreshToken: function (subject, payload) {
        var _a = jwt_1.default.Options, issuer = _a.issuer, audience = _a.audience, secretOrKey = _a.secretOrKey;
        return new Promise(function (resolve, reject) {
            (0, jsonwebtoken_1.sign)(payload, secretOrKey, {
                issuer: issuer,
                audience: audience,
                subject: String(subject),
                expiresIn: jwt_1.default.TTL2,
            }, function (error, token) {
                if (error) {
                    return reject(error);
                }
                resolve(token || "");
            });
        });
    },
};
exports.default = JWTService;
//# sourceMappingURL=JWTService.js.map