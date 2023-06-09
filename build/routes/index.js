"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = __importDefault(require("./auth"));
var users_1 = __importDefault(require("./users"));
var trainers_1 = __importDefault(require("./trainers"));
var categories_1 = __importDefault(require("./categories"));
var exercises_1 = __importDefault(require("./exercises"));
var workoutPlans_1 = __importDefault(require("./workoutPlans"));
var products_1 = __importDefault(require("./products"));
var dishes_1 = __importDefault(require("./dishes"));
var nutritionPlans_1 = __importDefault(require("./nutritionPlans"));
var uploads_1 = __importDefault(require("./uploads"));
var authenticate_1 = __importDefault(require("../middlewares/authenticate"));
var router = (0, express_1.Router)();
router.use("/auth", auth_1.default);
router.use("/users", authenticate_1.default, users_1.default);
router.use("/trainers", trainers_1.default);
router.use("/categories", categories_1.default);
router.use("/exercises", exercises_1.default);
router.use("/workout-plans", workoutPlans_1.default);
router.use("/products", products_1.default);
router.use("/dishes", dishes_1.default);
router.use("/nutrition-plans", nutritionPlans_1.default);
router.use("/uploads", uploads_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map