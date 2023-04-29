"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CategoryController_1 = require("./../controllers/CategoryController");
const validate_1 = require("./../middlewares/validate");
const category_1 = require("./../validation/schemas/category");
const controller = new CategoryController_1.CategoryController();
const router = (0, express_1.Router)();
router.get("/", controller.find);
router.get("/get-parent-cateogries", controller.getParentCategories);
router.post("/", (0, validate_1.validate)(category_1.categoryValidationSchema), controller.create);
router.get("/:id", validate_1.validateIdParam, controller.findOne);
router.put("/:id", validate_1.validateIdParam, (0, validate_1.validate)(category_1.categoryValidationSchema), controller.update);
router.put("/update-parent/:id", validate_1.validateIdParam, (0, validate_1.validate)(category_1.updateCategoryParentValidationSchema), controller.updateParent);
router.put("/update-children/:id", validate_1.validateIdParam, (0, validate_1.validate)(category_1.updateCategoryChildrenValidationSchema), controller.updateChildren);
router.delete("/:id", validate_1.validateIdParam, controller.delete);
exports.default = router;
