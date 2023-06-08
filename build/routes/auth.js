"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var validate_1 = require("./../middlewares/validate");
var auth_1 = require("./../validation/schemas/auth");
var router = (0, express_1.Router)();
var controller = new controllers_1.AuthController();
router.post("/signup", (0, validate_1.validate)(auth_1.signUpValidationSchema), controller.signup);
router.post("/signin", (0, validate_1.validate)(auth_1.signInValidationSchema), controller.signin);
router.post("/verify", (0, validate_1.validate)(auth_1.verifyOtpValidationSchema), controller.verify);
router.post("/refresh-token", (0, validate_1.validate)(auth_1.refreshTokenValidationSchema), controller.refreshToken);
router.post("/logout", (0, validate_1.validate)(auth_1.logOutValidationSchema), controller.logout);
exports.default = router;
//# sourceMappingURL=auth.js.map