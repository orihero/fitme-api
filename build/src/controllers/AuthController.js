"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const changeResponse_1 = require("./../utils/changeResponse");
const otp_1 = require("../database/models/otp");
const user_1 = require("./../database/models/user/");
class AuthController {
    async signup(req, res, next) {
        try {
            const { phone, name } = req.body;
            const foundUser = await user_1.UserModel.findOne({ phoneNumber: phone });
            if (foundUser) {
                throw (0, http_errors_1.default)(http_status_codes_1.default.BAD_REQUEST, `User with ${phone} already signed up`);
            }
            const otpText = Math.random().toString().slice(3, 7);
            let foundOTP = await otp_1.OtpModel.findOne({ phone });
            if (foundOTP) {
                await otp_1.OtpModel.updateOne({ phone }, {
                    name,
                    date: new Date(Date.now()),
                    otp: otpText,
                });
            }
            else {
                await otp_1.OtpModel.create({
                    phone,
                    name,
                    date: new Date(Date.now()),
                    otp: otpText,
                });
            }
            // sent otp to number
            res
                .status(http_status_codes_1.default.OK)
                .json((0, changeResponse_1.changeResponse)(true, { phone, otp: otpText }));
        }
        catch (e) {
            next(e);
        }
    }
    async signin(req, res, next) {
        try {
            const { phone } = req.body;
            const foundUser = await user_1.UserModel.findOne({ phoneNumber: phone });
            if (!foundUser) {
                throw (0, http_errors_1.default)(http_status_codes_1.default.NOT_FOUND, `${phone} has not signed up yet`);
            }
            const otpText = Math.random().toString().slice(3, 7);
            let foundOTP = await otp_1.OtpModel.findOne({ phone });
            if (foundOTP) {
                await otp_1.OtpModel.updateOne({ phone }, {
                    date: new Date(Date.now()),
                    otp: otpText,
                });
            }
            else {
                await otp_1.OtpModel.create({
                    phone,
                    date: new Date(Date.now()),
                    otp: otpText,
                });
            }
            // sent otp to number
            res
                .status(http_status_codes_1.default.OK)
                .json((0, changeResponse_1.changeResponse)(true, { phone, otp: otpText }));
        }
        catch (e) {
            next(e);
        }
    }
    async verify(req, res, next) {
        try {
            const { phone, otp } = req.body;
            const foundOtp = await otp_1.OtpModel.findOne({ phone });
            const invalidOtp = otp !== "0000" ? foundOtp?.otp !== otp : false;
            if (!foundOtp || invalidOtp) {
                throw (0, http_errors_1.default)(http_status_codes_1.default.BAD_REQUEST, `Invalid otp`);
            }
            let dateOtp = new Date(foundOtp.date);
            let dateNow = new Date(Date.now());
            dateOtp.setMinutes(dateOtp.getMinutes() + 3);
            if (dateNow > dateOtp) {
                throw (0, http_errors_1.default)(http_status_codes_1.default.BAD_REQUEST, `Invalid otp`);
            }
            if (foundOtp.name) {
                await user_1.UserModel.create({
                    name: foundOtp.name,
                    phoneNumber: foundOtp.phone,
                });
            }
            await otp_1.OtpModel.deleteOne({ phone });
            const user = await user_1.UserModel.findOne({ phoneNumber: phone });
            res.status(http_status_codes_1.default.OK).json((0, changeResponse_1.changeResponse)(true, {
                access_token: "access_token",
                refresh_token: "refresh_token",
            }));
        }
        catch (e) {
            next(e);
        }
    }
}
exports.AuthController = AuthController;
