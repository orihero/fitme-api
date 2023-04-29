"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const validate_1 = require("./../middlewares/validate");
const user_1 = require("./../validation/schemas/user");
const router = (0, express_1.Router)();
const controller = new UserController_1.UserController();
router.get("/", controller.find);
router.post("/", (0, validate_1.validate)(user_1.createUserValidationSchema), controller.create);
router.get("/:id", validate_1.validateIdParam, controller.findOne);
router.put("/update-name/:id", validate_1.validateIdParam, (0, validate_1.validate)(user_1.updateUserNameValidationSchema), controller.updateName);
router.put("/update-phoneNumber/:id", validate_1.validateIdParam, (0, validate_1.validate)(user_1.updateUserPhoneNumberValidationSchema), controller.updateNumber);
router.put("/update-proAccount/:id", validate_1.validateIdParam, controller.updateProAccount);
router.delete("/:id", validate_1.validateIdParam, controller.delete);
exports.default = router;
