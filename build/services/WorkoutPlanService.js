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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
var workout_1 = require("../database/models/workout");
var trainer_1 = require("../database/models/trainer");
var user_1 = require("../database/models/user");
var exercise_1 = require("../database/models/exercise");
var common_1 = require("../types/common");
var populate = [
    "creatorTrainer",
    "creatorUser",
    {
        path: "workouts",
        populate: {
            path: "exercise",
            model: "Exercise",
        },
    },
];
var WorkoutPlanService = {
    findAll: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var query, condition, condition, foundResult, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = {};
                    if (req.query.gender) {
                        condition = req.query.gender === common_1.GENDER.ALL ||
                            req.query.gender === common_1.GENDER.MALE ||
                            req.query.gender === common_1.GENDER.FEMALE;
                        if (!condition) {
                            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Wrong gender type");
                        }
                        if (req.query.gender === common_1.GENDER.MALE ||
                            req.query.gender === common_1.GENDER.FEMALE) {
                            query.gender = req.query.gender;
                        }
                    }
                    if (req.query.level) {
                        condition = req.query.level === common_1.LEVEL.NEWBIE ||
                            req.query.level === common_1.LEVEL.EXPERIENCED ||
                            req.query.level === common_1.LEVEL.ADVANCED;
                        if (!condition) {
                            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Wrong level type");
                        }
                        query.level = req.query.level;
                    }
                    return [4 /*yield*/, workout_1.WorkoutPlanModel.find(query).populate(populate)];
                case 1:
                    foundResult = _a.sent();
                    result = foundResult.map(function (_a) {
                        var creatorTrainer = _a.creatorTrainer, creatorUser = _a.creatorUser, workoutPlan = __rest(_a, ["creatorTrainer", "creatorUser"]);
                        return (__assign(__assign({}, workoutPlan._doc), { creator: creatorTrainer !== null && creatorTrainer !== void 0 ? creatorTrainer : creatorUser }));
                    });
                    return [2 /*return*/, result];
            }
        });
    }); },
    create: function (obj) { return __awaiter(void 0, void 0, void 0, function () {
        var title, description, price, gender, level, week, creator, workouts, foundUser, foundTrainer, i, j, foundExercise, creatorr, created;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    title = obj.title, description = obj.description, price = obj.price, gender = obj.gender, level = obj.level, week = obj.week, creator = obj.creator, workouts = obj.workouts;
                    return [4 /*yield*/, user_1.UserModel.findById(creator)];
                case 1:
                    foundUser = _a.sent();
                    return [4 /*yield*/, trainer_1.TrainerModel.findById(creator)];
                case 2:
                    foundTrainer = _a.sent();
                    if (!(foundUser || foundTrainer)) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "creator not found");
                    }
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < workouts.length)) return [3 /*break*/, 8];
                    j = 0;
                    _a.label = 4;
                case 4:
                    if (!(j < workouts[i].length)) return [3 /*break*/, 7];
                    return [4 /*yield*/, exercise_1.ExerciseModel.findById(workouts[i][j].exercise)];
                case 5:
                    foundExercise = _a.sent();
                    if (!foundExercise) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "exercise not found");
                    }
                    _a.label = 6;
                case 6:
                    j++;
                    return [3 /*break*/, 4];
                case 7:
                    i++;
                    return [3 /*break*/, 3];
                case 8:
                    creatorr = {};
                    if (foundUser) {
                        creatorr.creatorUser = foundUser._id;
                    }
                    else {
                        creatorr.creatorTrainer = foundTrainer === null || foundTrainer === void 0 ? void 0 : foundTrainer._id;
                    }
                    return [4 /*yield*/, workout_1.WorkoutPlanModel.create(__assign({ title: title, description: description, price: price, gender: gender, level: level, week: week, workouts: workouts }, creatorr))];
                case 9:
                    created = _a.sent();
                    if (!foundUser) return [3 /*break*/, 11];
                    // @ts-ignore
                    foundUser.workoutPlans = __spreadArray(__spreadArray([], foundUser.workoutPlans, true), [created._id], false);
                    return [4 /*yield*/, foundUser.save()];
                case 10:
                    _a.sent();
                    _a.label = 11;
                case 11:
                    if (!foundTrainer) return [3 /*break*/, 13];
                    // @ts-ignore
                    foundTrainer.workoutPlans = __spreadArray(__spreadArray([], foundTrainer.workoutPlans, true), [created._id], false);
                    return [4 /*yield*/, foundTrainer.save()];
                case 12:
                    _a.sent();
                    _a.label = 13;
                case 13: return [2 /*return*/, created];
            }
        });
    }); },
    find: function (condition) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, workout_1.WorkoutPlanModel.findOne(condition).populate(populate)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    delete: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var foundWorkoutPlan, trainer, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, WorkoutPlanService.find({
                        _id: id,
                    })];
                case 1:
                    foundWorkoutPlan = _a.sent();
                    if (!foundWorkoutPlan) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "workoutplan not found");
                    }
                    if (!foundWorkoutPlan.creatorTrainer) return [3 /*break*/, 4];
                    return [4 /*yield*/, trainer_1.TrainerModel.findById(foundWorkoutPlan.creatorTrainer)];
                case 2:
                    trainer = _a.sent();
                    if (!trainer) return [3 /*break*/, 4];
                    // @ts-ignore
                    trainer.workoutPlans = trainer.workoutPlans.filter(
                    // @ts-ignore
                    function (a) { return a.toString() !== id; });
                    return [4 /*yield*/, trainer.save()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    if (!foundWorkoutPlan.creatorUser) return [3 /*break*/, 7];
                    return [4 /*yield*/, user_1.UserModel.findById(foundWorkoutPlan.creatorUser)];
                case 5:
                    user = _a.sent();
                    if (!user) return [3 /*break*/, 7];
                    // @ts-ignore
                    user.workoutPlans = user.workoutPlans.filter(
                    // @ts-ignore
                    function (a) { return a.toString() !== id; });
                    return [4 /*yield*/, user.save()];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [4 /*yield*/, workout_1.WorkoutPlanModel.findByIdAndDelete(id)];
                case 8:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); },
};
exports.default = WorkoutPlanService;
//# sourceMappingURL=WorkoutPlanService.js.map