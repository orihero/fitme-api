"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("./../controllers");
var validate_1 = require("./../middlewares/validate");
var trainer_1 = require("./../validation/schemas/trainer");
var router = (0, express_1.Router)();
var controller = new controllers_1.TrainerController();
router.get("/", controller.find);
router.post("/", (0, validate_1.validate)(trainer_1.trainerValidationSchema), controller.create);
router.get("/:id", validate_1.validateIdParam, controller.findOne);
router.put("/:id", validate_1.validateIdParam, (0, validate_1.validate)(trainer_1.trainerValidationSchema), controller.update);
router.put("/request-add-trainer/:id", validate_1.validateIdParam, (0, validate_1.validate)(trainer_1.discipleValidationSchema), controller.requestAddTrainer);
router.put("/add-disciple/:id", validate_1.validateIdParam, (0, validate_1.validate)(trainer_1.discipleValidationSchema), controller.addDisciple);
router.patch("/remove-disciple/:id", validate_1.validateIdParam, (0, validate_1.validate)(trainer_1.discipleValidationSchema), controller.removeDisciple);
router.delete("/:id", validate_1.validateIdParam, controller.delete);
exports.default = router;
//# sourceMappingURL=trainers.js.map