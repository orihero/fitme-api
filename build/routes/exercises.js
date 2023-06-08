"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var validate_1 = require("./../middlewares/validate");
var exercise_1 = require("./../validation/schemas/exercise");
var controller = new controllers_1.ExerciseController();
var router = (0, express_1.Router)();
router.get("/", controller.find);
router.post("/", (0, validate_1.validate)(exercise_1.exerciseValidationSchema), controller.create);
router.get("/:id", validate_1.validateIdParam, controller.findOne);
router.put("/:id", validate_1.validateIdParam, (0, validate_1.validate)(exercise_1.updateExerciseValidationSchema), controller.update);
router.put("/update-category/:id", validate_1.validateIdParam, (0, validate_1.validate)(exercise_1.updateExerciseCategoryValidationSchema), controller.updateCategory);
router.delete("/:id", validate_1.validateIdParam, controller.delete);
exports.default = router;
//# sourceMappingURL=exercises.js.map