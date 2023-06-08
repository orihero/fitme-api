"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport_jwt_1 = require("passport-jwt");
var getSeconds_1 = require("../utils/getSeconds");
var JWTConfig = {
    TTL: (0, getSeconds_1.getSeconds)(process.env.JWT_ACCESS_TOKEN_EXP_DATE),
    TTL2: (0, getSeconds_1.getSeconds)(process.env.JWT_REFRESH_TOKEN_EXP_DATE),
    Options: {
        audience: "example.com",
        issuer: "api.example.com",
        secretOrKey: process.env.JWT_SECRET || "123",
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
};
exports.default = JWTConfig;
//# sourceMappingURL=jwt.js.map