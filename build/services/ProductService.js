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
var CategoryService_1 = __importDefault(require("./CategoryService"));
var product_1 = require("../database/models/product");
var user_1 = require("../database/models/user");
var trainer_1 = require("../database/models/trainer");
var category_1 = require("../database/models/category");
var common_1 = require("../types/common");
var populate = ["category", "creatorUser", "creatorTrainer"];
var ProductService = {
    findAll: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var query, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = {};
                    if (req.query.category) {
                        query.category = req.query.category;
                    }
                    return [4 /*yield*/, product_1.ProductModel.find(query).populate(populate)];
                case 1:
                    result = _a.sent();
                    if (!req.query.all) {
                        result = result.filter(function (p) { return p.creatorUser && p.creatorUser.role === common_1.ROLES.SUPERADMIN; });
                    }
                    return [2 /*return*/, result];
            }
        });
    }); },
    create: function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var name, calories, protein, oil, carb, categoryId, creatorId, foundProduct, duplicateName, foundCategory, foundUser, foundTrainer, creator, created;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    name = data.name, calories = data.calories, protein = data.protein, oil = data.oil, carb = data.carb, categoryId = data.category, creatorId = data.creator;
                    return [4 /*yield*/, product_1.ProductModel.findOne({
                            $or: [
                                { "name.en": name.en },
                                { "name.ru": name.ru },
                                { "name.uz": name.uz },
                            ],
                        })];
                case 1:
                    foundProduct = _c.sent();
                    if (foundProduct) {
                        duplicateName = "";
                        if (foundProduct.name.en === name.en) {
                            duplicateName = name.en;
                        }
                        if (foundProduct.name.ru === name.ru) {
                            duplicateName = name.ru;
                        }
                        if (foundProduct.name.uz === name.uz) {
                            duplicateName = name.uz;
                        }
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Product with \"".concat(duplicateName, "\" already created"));
                    }
                    return [4 /*yield*/, category_1.CategoryModel.findById(categoryId)];
                case 2:
                    foundCategory = _c.sent();
                    if (!foundCategory) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Category not found");
                    }
                    if (foundCategory.type !== common_1.CATEGORY_TYPES.PRODUCT) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid category");
                    }
                    return [4 /*yield*/, user_1.UserModel.findById(creatorId)];
                case 3:
                    foundUser = _c.sent();
                    return [4 /*yield*/, trainer_1.TrainerModel.findById(creatorId)];
                case 4:
                    foundTrainer = _c.sent();
                    if (!(foundUser || foundTrainer)) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "creator not found");
                    }
                    creator = {};
                    if (foundUser) {
                        creator.creatorUser = foundUser._id;
                    }
                    if (foundTrainer) {
                        creator.creatorTrainer = foundTrainer._id;
                    }
                    return [4 /*yield*/, product_1.ProductModel.create(__assign({ name: name, calories: calories, protein: protein, oil: oil, carb: carb, category: foundCategory }, creator))];
                case 5:
                    created = _c.sent();
                    if (!foundUser) return [3 /*break*/, 7];
                    foundUser.products = __spreadArray(__spreadArray([], ((_a = foundUser.products) !== null && _a !== void 0 ? _a : []), true), [created], false);
                    return [4 /*yield*/, foundUser.save()];
                case 6:
                    _c.sent();
                    _c.label = 7;
                case 7:
                    if (!foundTrainer) return [3 /*break*/, 9];
                    foundTrainer.products = __spreadArray(__spreadArray([], ((_b = foundTrainer.products) !== null && _b !== void 0 ? _b : []), true), [created], false);
                    return [4 /*yield*/, foundTrainer.save()];
                case 8:
                    _c.sent();
                    _c.label = 9;
                case 9: return [2 /*return*/, created];
            }
        });
    }); },
    find: function (condition) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, product_1.ProductModel.findOne(condition).populate(populate)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    updateCategory: function (_id, categoryId) { return __awaiter(void 0, void 0, void 0, function () {
        var category, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, CategoryService_1.default.findOne({
                        _id: categoryId,
                    })];
                case 1:
                    category = _a.sent();
                    if (!category) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Category not found");
                    }
                    if (category.type !== common_1.CATEGORY_TYPES.PRODUCT) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid Category");
                    }
                    return [4 /*yield*/, ProductService.find({ _id: _id })];
                case 2:
                    product = _a.sent();
                    if (!product) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Product not found");
                    }
                    if (product.category._id.toString() === category._id.toString()) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Category must be another Category");
                    }
                    product.category = category;
                    return [4 /*yield*/, product_1.ProductModel.findByIdAndUpdate(product._id, product)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, product];
            }
        });
    }); },
    delete: function (_id) { return __awaiter(void 0, void 0, void 0, function () {
        var product, user, trainer;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, ProductService.find({ _id: _id })];
                case 1:
                    product = _c.sent();
                    if (!product) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Product not found");
                    }
                    if (!product.creatorUser) return [3 /*break*/, 4];
                    return [4 /*yield*/, user_1.UserModel.findById(product.creatorUser._id)];
                case 2:
                    user = _c.sent();
                    if (!user) return [3 /*break*/, 4];
                    user.products = __spreadArray([], ((_a = user.products) !== null && _a !== void 0 ? _a : []), true).filter(function (p) { return p._id.toString() !== product._id.toString(); });
                    return [4 /*yield*/, user_1.UserModel.findByIdAndUpdate(user._id, user)];
                case 3:
                    _c.sent();
                    _c.label = 4;
                case 4:
                    if (!product.creatorTrainer) return [3 /*break*/, 7];
                    return [4 /*yield*/, trainer_1.TrainerModel.findById(product.creatorTrainer._id)];
                case 5:
                    trainer = _c.sent();
                    if (!trainer) return [3 /*break*/, 7];
                    trainer.products = __spreadArray([], ((_b = trainer.products) !== null && _b !== void 0 ? _b : []), true).filter(function (p) { return p._id.toString() !== product._id.toString(); });
                    return [4 /*yield*/, trainer_1.TrainerModel.findByIdAndUpdate(trainer._id, trainer)];
                case 6:
                    _c.sent();
                    _c.label = 7;
                case 7: return [4 /*yield*/, product_1.ProductModel.findByIdAndDelete(_id)];
                case 8:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    }); },
};
exports.default = ProductService;
//# sourceMappingURL=ProductService.js.map