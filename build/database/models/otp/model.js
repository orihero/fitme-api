"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpModel = void 0;
var mongoose_1 = require("mongoose");
var otpSchema = new mongoose_1.Schema({
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    otp: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});
exports.OtpModel = (0, mongoose_1.model)("Otp", otpSchema);
//# sourceMappingURL=model.js.map