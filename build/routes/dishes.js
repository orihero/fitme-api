"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("./../controllers");
var dish_1 = require("./../validation/schemas/dish");
var validate_1 = require("./../middlewares/validate");
var router = (0, express_1.Router)();
var controller = new controllers_1.DishController();
router.get("/", controller.find);
router.post("/", (0, validate_1.validate)(dish_1.dishValidationSchema), controller.create);
router.get("/:id", validate_1.validateIdParam, controller.findById);
router.put("/:id", validate_1.validateIdParam, (0, validate_1.validate)(dish_1.dishValidationSchema), controller.update);
router.delete("/:id", validate_1.validateIdParam, controller.delete);
exports.default = router;
//# sourceMappingURL=dishes.js.map