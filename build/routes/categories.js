"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("./../controllers");
var validate_1 = require("./../middlewares/validate");
var category_1 = require("./../validation/schemas/category");
var controller = new controllers_1.CategoryController();
var router = (0, express_1.Router)();
router.get("/", controller.find);
router.get("/get-parent-cateogries", controller.getParentCategories);
router.post("/", (0, validate_1.validate)(category_1.categoryValidationSchema), controller.create);
router.get("/:id", validate_1.validateIdParam, controller.findById);
router.put("/:id", validate_1.validateIdParam, (0, validate_1.validate)(category_1.categoryValidationSchema), controller.update);
router.put("/update-parent/:id", validate_1.validateIdParam, (0, validate_1.validate)(category_1.updateCategoryParentValidationSchema), controller.updateParent);
router.put("/update-children/:id", validate_1.validateIdParam, (0, validate_1.validate)(category_1.updateCategoryChildrenValidationSchema), controller.updateChildren);
router.delete("/:id", validate_1.validateIdParam, controller.delete);
exports.default = router;
//# sourceMappingURL=categories.js.map