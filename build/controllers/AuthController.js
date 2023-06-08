"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
var http_errors_1 = __importDefault(require("http-errors"));
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var jsonwebtoken_1 = require("jsonwebtoken");
var changeResponse_1 = require("./../utils/changeResponse");
var otp_1 = require("../database/models/otp");
var user_1 = require("./../database/models/user/");
var services_1 = require("../services");
var getSeconds_1 = require("./../utils/getSeconds");
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.prototype.signup = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, phone, name_1, foundUser, otpText, foundOTP, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        _a = req.body, phone = _a.phone, name_1 = _a.name;
                        return [4 /*yield*/, user_1.UserModel.findOne({ phoneNumber: phone })];
                    case 1:
                        foundUser = _b.sent();
                        if (foundUser) {
                            throw (0, http_errors_1.default)(http_status_codes_1.default.BAD_REQUEST, "User with ".concat(phone, " already signed up"));
                        }
                        otpText = Math.random().toString().slice(3, 7);
                        return [4 /*yield*/, otp_1.OtpModel.findOne({ phone: phone })];
                    case 2:
                        foundOTP = _b.sent();
                        if (!foundOTP) return [3 /*break*/, 4];
                        return [4 /*yield*/, otp_1.OtpModel.updateOne({ phone: phone }, {
                                name: name_1,
                                date: new Date(Date.now()),
                                otp: otpText,
                            })];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, otp_1.OtpModel.create({
                            phone: phone,
                            name: name_1,
                            date: new Date(Date.now()),
                            otp: otpText,
                        })];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        // sent otp to number
                        res
                            .status(http_status_codes_1.default.OK)
                            .json((0, changeResponse_1.changeResponse)(true, { phone: phone, otp: otpText }));
                        return [3 /*break*/, 8];
                    case 7:
                        e_1 = _b.sent();
                        next(e_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.signin = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var phone, foundUser, otpText, foundOTP, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        phone = req.body.phone;
                        return [4 /*yield*/, user_1.UserModel.findOne({ phoneNumber: phone })];
                    case 1:
                        foundUser = _a.sent();
                        if (!foundUser) {
                            throw (0, http_errors_1.default)(http_status_codes_1.default.NOT_FOUND, "".concat(phone, " has not signed up yet"));
                        }
                        otpText = Math.random().toString().slice(3, 7);
                        return [4 /*yield*/, otp_1.OtpModel.findOne({ phone: phone })];
                    case 2:
                        foundOTP = _a.sent();
                        if (!foundOTP) return [3 /*break*/, 4];
                        return [4 /*yield*/, otp_1.OtpModel.updateOne({ phone: phone }, {
                                date: new Date(Date.now()),
                                otp: otpText,
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, otp_1.OtpModel.create({
                            phone: phone,
                            date: new Date(Date.now()),
                            otp: otpText,
                        })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        // sent otp to number
                        res
                            .status(http_status_codes_1.default.OK)
                            .json((0, changeResponse_1.changeResponse)(true, { phone: phone, otp: otpText }));
                        return [3 /*break*/, 8];
                    case 7:
                        e_2 = _a.sent();
                        next(e_2);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.verify = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, phone, otp, foundOtp, invalidOtp, dateOtp, dateNow, user, accessToken, refreshToken, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 10, , 11]);
                        _a = req.body, phone = _a.phone, otp = _a.otp;
                        return [4 /*yield*/, otp_1.OtpModel.findOne({ phone: phone })];
                    case 1:
                        foundOtp = _b.sent();
                        invalidOtp = otp !== "0000" ? (foundOtp === null || foundOtp === void 0 ? void 0 : foundOtp.otp) !== otp : false;
                        if (!foundOtp || invalidOtp) {
                            throw (0, http_errors_1.default)(http_status_codes_1.default.BAD_REQUEST, "Invalid otp");
                        }
                        dateOtp = new Date(foundOtp.date);
                        dateNow = new Date(Date.now());
                        dateOtp.setMinutes(dateOtp.getMinutes() + 3);
                        dateOtp.setSeconds(dateOtp.getSeconds() + (0, getSeconds_1.getSeconds)(process.env.OTP_EXP_DATE));
                        if (dateNow > dateOtp) {
                            throw (0, http_errors_1.default)(http_status_codes_1.default.BAD_REQUEST, "Invalid otp");
                        }
                        if (!foundOtp.name) return [3 /*break*/, 3];
                        return [4 /*yield*/, user_1.UserModel.create({
                                name: foundOtp.name,
                                phoneNumber: foundOtp.phone,
                            })];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [4 /*yield*/, otp_1.OtpModel.findByIdAndDelete(foundOtp._id)];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, user_1.UserModel.findOne({ phoneNumber: phone })];
                    case 5:
                        user = _b.sent();
                        if (!user) return [3 /*break*/, 9];
                        return [4 /*yield*/, services_1.JWTService.signAccessToken(user === null || user === void 0 ? void 0 : user._id.toString(), {
                                phone: user === null || user === void 0 ? void 0 : user.phoneNumber,
                            })];
                    case 6:
                        accessToken = _b.sent();
                        return [4 /*yield*/, services_1.JWTService.signRefreshToken(user === null || user === void 0 ? void 0 : user._id.toString(), {
                                phone: user === null || user === void 0 ? void 0 : user.phoneNumber,
                            })];
                    case 7:
                        refreshToken = _b.sent();
                        return [4 /*yield*/, otp_1.OtpModel.create({
                                phone: phone,
                                otp: refreshToken,
                                date: new Date(),
                            })];
                    case 8:
                        _b.sent();
                        res.status(http_status_codes_1.default.OK).json((0, changeResponse_1.changeResponse)(true, {
                            access_token: accessToken,
                            refresh_token: refreshToken,
                        }));
                        _b.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        e_3 = _b.sent();
                        console.log("e: ", e_3);
                        next(e_3);
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.refreshToken = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var foundOtp, dateOtp, dateNow, access_token, e_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, otp_1.OtpModel.findOne({ otp: req.body.refreshToken })];
                    case 1:
                        foundOtp = _b.sent();
                        if (!foundOtp) {
                            throw (0, http_errors_1.default)(http_status_codes_1.default.BAD_REQUEST, "Invalid token");
                        }
                        dateOtp = new Date(foundOtp.date);
                        dateNow = new Date(Date.now());
                        dateOtp.setSeconds(dateOtp.getSeconds() +
                            (0, getSeconds_1.getSeconds)(process.env.JWT_REFRESH_TOKEN_EXP_DATE));
                        if (!(dateNow > dateOtp)) return [3 /*break*/, 3];
                        return [4 /*yield*/, otp_1.OtpModel.deleteOne({ otp: req.body.refreshToken })];
                    case 2:
                        _b.sent();
                        throw (0, http_errors_1.default)(http_status_codes_1.default.BAD_REQUEST, "Invalid token");
                    case 3: return [4 /*yield*/, services_1.JWTService.signAccessToken(
                        // @ts-ignore
                        (_a = (0, jsonwebtoken_1.decode)(req.body.refreshToken)) === null || _a === void 0 ? void 0 : _a.sub, {
                            phone: foundOtp.phone,
                        })];
                    case 4:
                        access_token = _b.sent();
                        res.status(http_status_codes_1.default.OK).json((0, changeResponse_1.changeResponse)(true, {
                            access_token: access_token,
                        }));
                        return [3 /*break*/, 6];
                    case 5:
                        e_4 = _b.sent();
                        next(e_4);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.logout = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var phone, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        phone = req.body.phone;
                        return [4 /*yield*/, otp_1.OtpModel.deleteOne({ phone: phone })];
                    case 1:
                        _a.sent();
                        res.status(http_status_codes_1.default.OK).json((0, changeResponse_1.changeResponse)(true, null));
                        return [3 /*break*/, 3];
                    case 2:
                        e_5 = _a.sent();
                        next(e_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AuthController;
}());
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map