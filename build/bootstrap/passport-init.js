"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var passport_jwt_1 = require("passport-jwt");
var services_1 = require("../services");
var jwt_1 = __importDefault(require("../config/jwt"));
passport_1.default.serializeUser(function (user, done) { return done(null, user); });
passport_1.default.deserializeUser(function (user, done) { return done(null, user); });
var init = function () {
    passport_1.default.use(new passport_jwt_1.Strategy(jwt_1.default.Options, function (payload, done) {
        services_1.UserService.find({ _id: payload.sub })
            .then(function (user) { return (user ? done(null, user) : done(null, false)); })
            .catch(function (error) { return done(error, false); });
    }));
};
exports.default = init;
//# sourceMappingURL=passport-init.js.map