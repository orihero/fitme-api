"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vonage = void 0;
var server_sdk_1 = require("@vonage/server-sdk");
exports.vonage = new server_sdk_1.Vonage({
    // @ts-ignore
    apiKey: process.env.VONAGE_API_KEY,
    // @ts-ignore
    apiSecret: process.env.VONAGE_API_SECRET,
});
//# sourceMappingURL=vonage.js.map