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
exports.CategoryController = void 0;
var http_errors_1 = __importDefault(require("http-errors"));
var http_status_codes_1 = require("http-status-codes");
var model_1 = require("./../database/models/category/model");
var changeResponse_1 = require("./../utils/changeResponse");
var services_1 = require("../services");
var CategoryController = /** @class */ (function () {
    function CategoryController() {
    }
    CategoryController.prototype.find = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var query, result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        query = {};
                        if (req.query.type) {
                            query.type = req.query.type;
                        }
                        return [4 /*yield*/, model_1.CategoryModel.find(query).populate([
                                "parent",
                                "children",
                            ])];
                    case 1:
                        result = _a.sent();
                        if (req.query.parents) {
                            result = result.filter(function (c) { return !c.parent; });
                        }
                        res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, result));
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        next(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CategoryController.prototype.getParentCategories = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, model_1.CategoryModel.find(__assign({ parent: undefined }, req.query)).populate(["parent", "children"])];
                    case 1:
                        result = _a.sent();
                        res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, result));
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        next(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CategoryController.prototype.create = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var parent_1, _id, saved, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        parent_1 = null;
                        _id = req.body.parent;
                        if (!_id) return [3 /*break*/, 2];
                        return [4 /*yield*/, model_1.CategoryModel.findOne({ _id: _id })];
                    case 1:
                        parent_1 = _b.sent();
                        if (!parent_1) {
                            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Parent Category not found");
                        }
                        _b.label = 2;
                    case 2: return [4 /*yield*/, model_1.CategoryModel.create(__assign(__assign({}, req.body), { parent: (_a = parent_1 === null || parent_1 === void 0 ? void 0 : parent_1._id) !== null && _a !== void 0 ? _a : undefined }))];
                    case 3:
                        saved = _b.sent();
                        if (!parent_1) return [3 /*break*/, 5];
                        parent_1.children = __spreadArray(__spreadArray([], parent_1.children, true), [saved._id], false);
                        return [4 /*yield*/, parent_1.save()];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        res.status(http_status_codes_1.StatusCodes.CREATED).json((0, changeResponse_1.changeResponse)(true, saved));
                        return [3 /*break*/, 7];
                    case 6:
                        e_3 = _b.sent();
                        next(e_3);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    CategoryController.prototype.findById = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var found, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.CategoryService.findOne({ _id: req.params.id })];
                    case 1:
                        found = _a.sent();
                        if (!found) {
                            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Category not found");
                        }
                        res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, found));
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _a.sent();
                        next(e_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CategoryController.prototype.update = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, updated, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        _id = req.params.id;
                        return [4 /*yield*/, model_1.CategoryModel.updateOne({ _id: _id }, __assign({}, req.body))];
                    case 1:
                        updated = _a.sent();
                        if (!updated.modifiedCount) {
                            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Category not found");
                        }
                        res
                            .status(http_status_codes_1.StatusCodes.OK)
                            .json((0, changeResponse_1.changeResponse)(true, __assign(__assign({}, req.body), { _id: _id })));
                        return [3 /*break*/, 3];
                    case 2:
                        e_5 = _a.sent();
                        next(e_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CategoryController.prototype.updateParent = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var updated, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.CategoryService.updateParent(req.params.id, req.body.parent)];
                    case 1:
                        updated = _a.sent();
                        res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, updated));
                        return [3 /*break*/, 3];
                    case 2:
                        e_6 = _a.sent();
                        next(e_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CategoryController.prototype.updateChildren = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var updated, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.CategoryService.updateChildren(req.params.id, req.body.children)];
                    case 1:
                        updated = _a.sent();
                        res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, updated));
                        return [3 /*break*/, 3];
                    case 2:
                        e_7 = _a.sent();
                        next(e_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CategoryController.prototype.delete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.CategoryService.delete(req.params.id)];
                    case 1:
                        _a.sent();
                        res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, null));
                        return [3 /*break*/, 3];
                    case 2:
                        e_8 = _a.sent();
                        next(e_8);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return CategoryController;
}());
exports.CategoryController = CategoryController;
//# sourceMappingURL=CategoryController.js.map