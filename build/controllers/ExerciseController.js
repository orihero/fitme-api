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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseController = void 0;
var http_errors_1 = __importDefault(require("http-errors"));
var http_status_codes_1 = require("http-status-codes");
var services_1 = require("../services");
var exercise_1 = require("../database/models/exercise");
var changeResponse_1 = require("./../utils/changeResponse");
var ExerciseController = /** @class */ (function () {
    function ExerciseController() {
    }
    ExerciseController.prototype.find = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var query, result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = {};
                        if (req.query.category) {
                            query.category = req.query.category;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, exercise_1.ExerciseModel.find(query).populate("category")];
                    case 2:
                        result = _a.sent();
                        res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, result));
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        next(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ExerciseController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var created, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.ExerciseService.create(req.body)];
                    case 1:
                        created = _a.sent();
                        res.status(http_status_codes_1.StatusCodes.CREATED).json((0, changeResponse_1.changeResponse)(true, created));
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
    ExerciseController.prototype.findOne = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var found, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.ExerciseService.find({ _id: req.params.id })];
                    case 1:
                        found = _a.sent();
                        if (!found) {
                            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Exercise not found");
                        }
                        res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, found));
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        next(e_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ExerciseController.prototype.update = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, _a, title, video, image, description, metadescription, updated, e_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _id = req.params.id;
                        _a = req.body, title = _a.title, video = _a.video, image = _a.image, description = _a.description, metadescription = _a.metadescription;
                        return [4 /*yield*/, exercise_1.ExerciseModel.updateOne({ _id: _id }, { title: title, video: video, image: image, description: description, metadescription: metadescription })];
                    case 1:
                        updated = _b.sent();
                        if (!updated.modifiedCount) {
                            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Exercise not found");
                        }
                        res
                            .status(http_status_codes_1.StatusCodes.OK)
                            .json((0, changeResponse_1.changeResponse)(true, __assign(__assign({}, req.body), { _id: _id })));
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _b.sent();
                        next(e_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ExerciseController.prototype.updateCategory = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var exercise, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.ExerciseService.updateCategory(req.params.id, req.body.category)];
                    case 1:
                        exercise = _a.sent();
                        res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, exercise));
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
    ExerciseController.prototype.delete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.ExerciseService.delete(req.params.id)];
                    case 1:
                        _a.sent();
                        res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, null));
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
    return ExerciseController;
}());
exports.ExerciseController = ExerciseController;
//# sourceMappingURL=ExerciseController.js.map