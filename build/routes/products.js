"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var validate_1 = require("../middlewares/validate");
var product_1 = require("../validation/schemas/product");
var controller = new controllers_1.ProductController();
var router = (0, express_1.Router)();
router.get("/", controller.find);
router.post("/", (0, validate_1.validate)(product_1.createProductValidationSchema), controller.create);
router.get("/:id", validate_1.validateIdParam, controller.findOne);
router.put("/:id", validate_1.validateIdParam, (0, validate_1.validate)(product_1.updateProductValidationSchema), controller.update);
router.put("/update-category/:id", validate_1.validateIdParam, (0, validate_1.validate)(product_1.updateProductCategoryValidationSchema), controller.updateCategory);
router.delete("/:id", validate_1.validateIdParam, controller.delete);
exports.default = router;
//# sourceMappingURL=products.js.map