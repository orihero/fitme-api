"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_errors_1 = __importDefault(require("http-errors"));
var http_status_codes_1 = require("http-status-codes");
var _1 = require(".");
var exercise_1 = require("../database/models/exercise");
var common_1 = require("../types/common");
var populate = ["category"];
var ExerciseService = {
    find: function (condition) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exercise_1.ExerciseModel.findOne(condition).populate(populate)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    create: function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var title, video, image, description, metadescription, found, category, created;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    title = data.title, video = data.video, image = data.image, description = data.description, metadescription = data.metadescription;
                    return [4 /*yield*/, ExerciseService.find({ title: title })];
                case 1:
                    found = _a.sent();
                    if (found) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "".concat(title, " is already created"));
                    }
                    return [4 /*yield*/, _1.CategoryService.findOne({
                            _id: data.category,
                        })];
                case 2:
                    category = _a.sent();
                    if (!category) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Category not found");
                    }
                    if (!category.parent || category.type !== common_1.CATEGORY_TYPES.EXERCISE) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid Category");
                    }
                    return [4 /*yield*/, exercise_1.ExerciseModel.create({
                            title: title,
                            video: video,
                            image: image,
                            description: description,
                            metadescription: metadescription,
                            category: category,
                        })];
                case 3:
                    created = _a.sent();
                    return [2 /*return*/, created];
            }
        });
    }); },
    updateCategory: function (_id, categoryId) { return __awaiter(void 0, void 0, void 0, function () {
        var category, exercise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _1.CategoryService.findOne({
                        _id: categoryId,
                    })];
                case 1:
                    category = _a.sent();
                    if (!category) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Category not found");
                    }
                    if (!category.parent || category.type !== common_1.CATEGORY_TYPES.EXERCISE) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid Category");
                    }
                    return [4 /*yield*/, ExerciseService.find({
                            _id: _id,
                        })];
                case 2:
                    exercise = _a.sent();
                    if (!exercise) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Exercise not found");
                    }
                    if ((exercise === null || exercise === void 0 ? void 0 : exercise.category._id.toString()) === category._id.toString()) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Category must be another Category");
                    }
                    exercise.category = category;
                    return [4 /*yield*/, exercise_1.ExerciseModel.findByIdAndUpdate(exercise._id, exercise)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, exercise];
            }
        });
    }); },
    delete: function (_id) { return __awaiter(void 0, void 0, void 0, function () {
        var found;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ExerciseService.find({ _id: _id })];
                case 1:
                    found = _a.sent();
                    if (!found) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Exercise not found");
                    }
                    return [4 /*yield*/, exercise_1.ExerciseModel.findByIdAndDelete(_id)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); },
};
exports.default = ExerciseService;
//# sourceMappingURL=ExerciseService.js.map