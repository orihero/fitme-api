"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_errors_1 = __importDefault(require("http-errors"));
var http_status_codes_1 = require("http-status-codes");
var nutrition_1 = require("../database/models/nutrition");
var user_1 = require("../database/models/user");
var trainer_1 = require("../database/models/trainer");
var product_1 = require("../database/models/product");
var dish_1 = require("../database/models/dish");
var common_1 = require("../types/common");
var populate = [
    "creatorUser",
    "creatorTrainer",
    {
        path: "nutritions",
        populate: [
            {
                path: "products",
                populate: ["category", "creatorUser", "creatorTrainer"],
            },
            {
                path: "dishes",
                populate: [
                    { path: "products", populate: "category" },
                    "category",
                    "creatorUser",
                    "creatorTrainer",
                ],
            },
        ],
    },
];
var NutritionPlanService = {
    findAll: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var query;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = {};
                    if (req.query.type) {
                        if (req.query.type !== common_1.NUTRITION_TYPE.FAT &&
                            req.query.type !== common_1.NUTRITION_TYPE.THIN) {
                            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Wrong nutrition type");
                        }
                        query.type = req.query.type;
                    }
                    return [4 /*yield*/, nutrition_1.NutritionPlanModel.find(query).populate(populate)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    create: function (obj) { return __awaiter(void 0, void 0, void 0, function () {
        var creatorName, title, description, calories, proteinPercent, oilPercent, type, creator, nutritions, foundUser, foundTrainer, i, j, _a, products, amountsP, dishes, amountsD, l, foundProduct, l, foundDish, creatorr, created;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    creatorName = obj.creatorName, title = obj.title, description = obj.description, calories = obj.calories, proteinPercent = obj.proteinPercent, oilPercent = obj.oilPercent, type = obj.type, creator = obj.creator, nutritions = obj.nutritions;
                    return [4 /*yield*/, user_1.UserModel.findById(creator)];
                case 1:
                    foundUser = _d.sent();
                    return [4 /*yield*/, trainer_1.TrainerModel.findById(creator)];
                case 2:
                    foundTrainer = _d.sent();
                    if (!(foundUser || foundTrainer)) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "creator not found");
                    }
                    i = 0;
                    _d.label = 3;
                case 3:
                    if (!(i < nutritions.length)) return [3 /*break*/, 14];
                    j = 0;
                    _d.label = 4;
                case 4:
                    if (!(j < nutritions[i].length)) return [3 /*break*/, 13];
                    _a = nutritions[i][j], products = _a.products, amountsP = _a.amountsP, dishes = _a.dishes, amountsD = _a.amountsD;
                    if (products.length === 0 && dishes.length === 0) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid nutritions");
                    }
                    if (products.length !== amountsP.length ||
                        dishes.length !== amountsD.length) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid amounts");
                    }
                    l = 0;
                    _d.label = 5;
                case 5:
                    if (!(l < products.length)) return [3 /*break*/, 8];
                    return [4 /*yield*/, product_1.ProductModel.findById(products[l])];
                case 6:
                    foundProduct = _d.sent();
                    if (!foundProduct) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Product not found");
                    }
                    _d.label = 7;
                case 7:
                    l++;
                    return [3 /*break*/, 5];
                case 8:
                    l = 0;
                    _d.label = 9;
                case 9:
                    if (!(l < dishes.length)) return [3 /*break*/, 12];
                    return [4 /*yield*/, dish_1.DishModel.findById(dishes[l])];
                case 10:
                    foundDish = _d.sent();
                    if (!foundDish) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Dish not found");
                    }
                    _d.label = 11;
                case 11:
                    l++;
                    return [3 /*break*/, 9];
                case 12:
                    j++;
                    return [3 /*break*/, 4];
                case 13:
                    i++;
                    return [3 /*break*/, 3];
                case 14:
                    creatorr = {};
                    if (foundUser) {
                        creatorr.creatorUser = foundUser._id;
                    }
                    else {
                        creatorr.creatorTrainer = foundTrainer === null || foundTrainer === void 0 ? void 0 : foundTrainer._id;
                    }
                    return [4 /*yield*/, nutrition_1.NutritionPlanModel.create(__assign({ creatorName: creatorName, title: title, description: description, calories: calories, proteinPercent: proteinPercent, oilPercent: oilPercent, type: type, nutritions: nutritions }, creatorr))];
                case 15:
                    created = _d.sent();
                    if (!foundUser) return [3 /*break*/, 17];
                    foundUser.nutritionPlans = __spreadArray(__spreadArray([], ((_b = foundUser.nutritionPlans) !== null && _b !== void 0 ? _b : []), true), [created], false);
                    return [4 /*yield*/, foundUser.save()];
                case 16:
                    _d.sent();
                    _d.label = 17;
                case 17:
                    if (!foundTrainer) return [3 /*break*/, 19];
                    foundTrainer.nutritionPlans = __spreadArray(__spreadArray([], ((_c = foundTrainer.nutritionPlans) !== null && _c !== void 0 ? _c : []), true), [
                        created,
                    ], false);
                    return [4 /*yield*/, foundTrainer.save()];
                case 18:
                    _d.sent();
                    _d.label = 19;
                case 19: return [2 /*return*/, created];
            }
        });
    }); },
    find: function (condition) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, nutrition_1.NutritionPlanModel.findOne(condition).populate(populate)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    delete: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var foundNutritionPlan, trainer, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, NutritionPlanService.find({
                        _id: id,
                    })];
                case 1:
                    foundNutritionPlan = _a.sent();
                    if (!foundNutritionPlan) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "nutritionPlan not found");
                    }
                    if (!foundNutritionPlan.creatorTrainer) return [3 /*break*/, 4];
                    return [4 /*yield*/, trainer_1.TrainerModel.findById(foundNutritionPlan.creatorTrainer)];
                case 2:
                    trainer = _a.sent();
                    if (!trainer) return [3 /*break*/, 4];
                    // @ts-ignore
                    trainer.nutritionPlans = trainer.nutritionPlans.filter(
                    // @ts-ignore
                    function (a) { return a.toString() !== id; });
                    return [4 /*yield*/, trainer.save()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    if (!foundNutritionPlan.creatorUser) return [3 /*break*/, 7];
                    return [4 /*yield*/, user_1.UserModel.findById(foundNutritionPlan.creatorUser)];
                case 5:
                    user = _a.sent();
                    if (!user) return [3 /*break*/, 7];
                    // @ts-ignore
                    user.nutritionPlans = user.nutritionPlans.filter(
                    // @ts-ignore
                    function (a) { return a.toString() !== id; });
                    return [4 /*yield*/, user.save()];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [4 /*yield*/, nutrition_1.NutritionPlanModel.findByIdAndDelete(id)];
                case 8:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); },
};
exports.default = NutritionPlanService;
//# sourceMappingURL=NutritionPlanService.js.map