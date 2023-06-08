"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var validate_1 = require("../middlewares/validate");
var controllers_1 = require("../controllers");
var nutrition_1 = require("../validation/schemas/nutrition");
var controller = new controllers_1.NutritionPlanController();
var router = (0, express_1.Router)();
router.get("/", controller.find);
router.post("/", (0, validate_1.validate)(nutrition_1.createNutritionPlanValidationSchema), controller.create);
router.get("/:id", validate_1.validateIdParam, controller.findOne);
router.put("/:id", validate_1.validateIdParam, controller.update);
router.delete("/:id", validate_1.validateIdParam, controller.delete);
exports.default = router;
//# sourceMappingURL=nutritionPlans.js.map