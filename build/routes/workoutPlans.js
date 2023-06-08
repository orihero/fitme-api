"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("./../controllers");
var validate_1 = require("./../middlewares/validate");
var workout_1 = require("./../validation/schemas/workout");
var controller = new controllers_1.WorkoutPlanController();
var router = (0, express_1.Router)();
router.get("/", controller.find);
router.post("/", (0, validate_1.validate)(workout_1.createWorkoutPlanValidationSchema), controller.create);
router.get("/:id", validate_1.validateIdParam, controller.findOne);
router.put("/:id", validate_1.validateIdParam, controller.update);
router.delete("/:id", validate_1.validateIdParam, controller.delete);
exports.default = router;
//# sourceMappingURL=workoutPlans.js.map