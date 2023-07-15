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
var TrainerService_1 = __importDefault(require("./TrainerService"));
var user_1 = require("../database/models/user");
var trainer_1 = require("../database/models/trainer");
var otp_1 = require("../database/models/otp");
var exercise_1 = require("../database/models/exercise");
var workout_1 = require("../database/models/workout");
var product_1 = require("../database/models/product");
var dish_1 = require("../database/models/dish");
var populate = [
    "myTrainers",
    {
        path: "favoriteExercises",
        populate: {
            path: "category",
        },
    },
    {
        path: "workoutPlans",
        populate: {
            path: "workouts",
            populate: {
                path: "exercise",
                model: "Exercise",
            },
        },
    },
    {
        path: "scheduleWorkouts",
        populate: [
            {
                path: "executor",
            },
            {
                path: "plan",
                populate: {
                    path: "workouts",
                    populate: "exercise",
                },
            },
        ],
    },
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
    {
        path: "nutritionPlans",
        populate: [
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
        ],
    },
    {
        path: "schemaNutritions",
        populate: [
            {
                path: "products",
                populate: "category",
            },
            {
                path: "dishes",
                populate: [{ path: "products", populate: "category" }, "category"],
            },
        ],
    },
];
var UserService = {
    findAll: function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_1.UserModel.find().populate(populate)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    create: function (obj) { return __awaiter(void 0, void 0, void 0, function () {
        var phoneNumber, name, foundByPhoneNumber1, foundByPhoneNumber2, foundByName, saved;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    phoneNumber = obj.phoneNumber, name = obj.name;
                    return [4 /*yield*/, UserService.find({ phoneNumber: phoneNumber })];
                case 1:
                    foundByPhoneNumber1 = _a.sent();
                    return [4 /*yield*/, TrainerService_1.default.find({ phoneNumber: phoneNumber })];
                case 2:
                    foundByPhoneNumber2 = _a.sent();
                    if (foundByPhoneNumber1 || foundByPhoneNumber2) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "User with \"".concat(phoneNumber, "\" already created"));
                    }
                    return [4 /*yield*/, UserService.find({ name: name })];
                case 3:
                    foundByName = _a.sent();
                    if (foundByName) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "User with \"".concat(name, "\" already created"));
                    }
                    return [4 /*yield*/, user_1.UserModel.create({
                            name: name,
                            phoneNumber: phoneNumber,
                        })];
                case 4:
                    saved = _a.sent();
                    return [2 /*return*/, saved];
            }
        });
    }); },
    find: function (condition) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_1.UserModel.findOne(condition).populate(populate)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    updateName: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var found;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    found = req.user;
                    if (!(req.params.id !== found._id.toString())) return [3 /*break*/, 2];
                    return [4 /*yield*/, UserService.find({ _id: req.params.id })];
                case 1:
                    found = _a.sent();
                    _a.label = 2;
                case 2:
                    if (!found) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
                    }
                    found.name = req.body.name;
                    return [4 /*yield*/, user_1.UserModel.findByIdAndUpdate(req.params.id, found)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, found];
            }
        });
    }); },
    updateNumber: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var found;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    found = req.user;
                    if (!(req.params.id !== found._id.toString())) return [3 /*break*/, 2];
                    return [4 /*yield*/, UserService.find({ _id: req.params.id })];
                case 1:
                    found = _a.sent();
                    _a.label = 2;
                case 2:
                    if (!found) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
                    }
                    found.phoneNumber = req.body.phoneNumber;
                    return [4 /*yield*/, user_1.UserModel.findByIdAndUpdate(req.params.id, found)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, found];
            }
        });
    }); },
    updateProAccount: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var found;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    found = req.user;
                    if (!(req.params.id !== found._id.toString())) return [3 /*break*/, 2];
                    return [4 /*yield*/, UserService.find({ _id: req.params.id })];
                case 1:
                    found = _a.sent();
                    _a.label = 2;
                case 2:
                    if (!found) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
                    }
                    found.isProAccount = !found.isProAccount;
                    return [4 /*yield*/, user_1.UserModel.findByIdAndUpdate(req.params.id, found)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, found];
            }
        });
    }); },
    addWorkoutPlan: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var foundUser, foundPlan;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    foundUser = req.user;
                    if (!(req.params.id !== foundUser._id.toString())) return [3 /*break*/, 2];
                    return [4 /*yield*/, UserService.find({ _id: req.params.id })];
                case 1:
                    foundUser = _c.sent();
                    _c.label = 2;
                case 2:
                    if (!foundUser) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
                    }
                    if ((_a = foundUser.workoutPlans) === null || _a === void 0 ? void 0 : _a.length) {
                        foundUser.workoutPlans.map(function (plan) {
                            if (plan._id.toString() === req.body.planId) {
                                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Plan already added");
                            }
                        });
                    }
                    return [4 /*yield*/, workout_1.WorkoutPlanModel.findById(req.body.planId).populate({
                            path: "workouts",
                            populate: {
                                path: "exercise",
                                model: "Exercise",
                            },
                        })];
                case 3:
                    foundPlan = _c.sent();
                    if (!foundPlan) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Plan not found");
                    }
                    foundUser.workoutPlans = __spreadArray(__spreadArray([], ((_b = foundUser.workoutPlans) !== null && _b !== void 0 ? _b : []), true), [foundPlan], false);
                    return [4 /*yield*/, user_1.UserModel.findByIdAndUpdate(req.params.id, foundUser)];
                case 4:
                    _c.sent();
                    return [2 /*return*/, foundUser];
            }
        });
    }); },
    removeWorkoutPlan: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var foundUser, findIndex, arr;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    foundUser = req.user;
                    if (!(req.params.id !== foundUser._id.toString())) return [3 /*break*/, 2];
                    return [4 /*yield*/, UserService.find({ _id: req.params.id })];
                case 1:
                    foundUser = _b.sent();
                    _b.label = 2;
                case 2:
                    if (!foundUser) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
                    }
                    findIndex = __spreadArray([], ((_a = foundUser.workoutPlans) !== null && _a !== void 0 ? _a : []), true).findIndex(function (a) { return a._id.toString() === req.body.planId; });
                    if (!findIndex || findIndex === -1) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Invalid planId");
                    }
                    arr = __spreadArray([], foundUser.workoutPlans, true);
                    arr = __spreadArray(__spreadArray([], arr.slice(0, findIndex), true), arr.slice(findIndex + 1), true);
                    foundUser.workoutPlans = __spreadArray([], arr, true);
                    return [4 /*yield*/, user_1.UserModel.findByIdAndUpdate(req.params.id, foundUser)];
                case 3:
                    _b.sent();
                    return [2 /*return*/, foundUser];
            }
        });
    }); },
    addFavoriteExercise: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var foundUser, foundExercise;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    foundUser = req.user;
                    if (!(req.params.id !== foundUser._id.toString())) return [3 /*break*/, 2];
                    return [4 /*yield*/, UserService.find({ _id: req.params.id })];
                case 1:
                    foundUser = _c.sent();
                    _c.label = 2;
                case 2:
                    if (!foundUser) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
                    }
                    if ((_a = foundUser.favoriteExercises) === null || _a === void 0 ? void 0 : _a.length) {
                        foundUser.favoriteExercises.map(function (exercise) {
                            if (exercise._id.toString() === req.body.exerciseId) {
                                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Exercise already added");
                            }
                        });
                    }
                    return [4 /*yield*/, exercise_1.ExerciseModel.findById(req.body.exerciseId)];
                case 3:
                    foundExercise = _c.sent();
                    if (!foundExercise) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Exercise not found");
                    }
                    foundUser.favoriteExercises = __spreadArray(__spreadArray([], ((_b = foundUser.favoriteExercises) !== null && _b !== void 0 ? _b : []), true), [
                        foundExercise,
                    ], false);
                    return [4 /*yield*/, user_1.UserModel.findByIdAndUpdate(req.params.id, foundUser)];
                case 4:
                    _c.sent();
                    return [2 /*return*/, foundUser];
            }
        });
    }); },
    removeFavoriteExercise: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var foundUser, findIndex, arr;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    foundUser = req.user;
                    if (!(req.params.id !== foundUser._id.toString())) return [3 /*break*/, 2];
                    return [4 /*yield*/, UserService.find({ _id: req.params.id })];
                case 1:
                    foundUser = _b.sent();
                    _b.label = 2;
                case 2:
                    if (!foundUser) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
                    }
                    findIndex = __spreadArray([], ((_a = foundUser.favoriteExercises) !== null && _a !== void 0 ? _a : []), true).findIndex(function (a) { return a._id.toString() === req.body.exerciseId; });
                    if (findIndex === -1) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Invalid exerciseId");
                    }
                    arr = __spreadArray([], foundUser.favoriteExercises, true);
                    arr = __spreadArray(__spreadArray([], arr.slice(0, findIndex), true), arr.slice(findIndex + 1), true);
                    foundUser.favoriteExercises = __spreadArray([], arr, true);
                    return [4 /*yield*/, user_1.UserModel.findByIdAndUpdate(req.params.id, foundUser)];
                case 3:
                    _b.sent();
                    return [2 /*return*/, foundUser];
            }
        });
    }); },
    addProduct: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var foundUser, foundProduct;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    foundUser = req.user;
                    if (!(req.params.id !== foundUser._id.toString())) return [3 /*break*/, 2];
                    return [4 /*yield*/, UserService.find({ _id: req.params.id })];
                case 1:
                    foundUser = _c.sent();
                    _c.label = 2;
                case 2:
                    if (!foundUser) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
                    }
                    if ((_a = foundUser.products) === null || _a === void 0 ? void 0 : _a.length) {
                        foundUser.products.map(function (product) {
                            if (product._id.toString() === req.body.productId) {
                                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Product already added");
                            }
                        });
                    }
                    return [4 /*yield*/, product_1.ProductModel.findById(req.body.productId)];
                case 3:
                    foundProduct = _c.sent();
                    if (!foundProduct) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Product not found");
                    }
                    foundUser.products = __spreadArray(__spreadArray([], ((_b = foundUser.products) !== null && _b !== void 0 ? _b : []), true), [foundProduct], false);
                    return [4 /*yield*/, user_1.UserModel.findByIdAndUpdate(req.params.id, foundUser)];
                case 4:
                    _c.sent();
                    return [2 /*return*/, foundUser];
            }
        });
    }); },
    removeProduct: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var foundUser, findIndex, arr;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    foundUser = req.user;
                    if (!(req.params.id !== foundUser._id.toString())) return [3 /*break*/, 2];
                    return [4 /*yield*/, UserService.find({ _id: req.params.id })];
                case 1:
                    foundUser = _c.sent();
                    _c.label = 2;
                case 2:
                    if (!foundUser) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
                    }
                    findIndex = __spreadArray([], ((_a = foundUser.products) !== null && _a !== void 0 ? _a : []), true).findIndex(function (a) { return a._id.toString() === req.body.productId; });
                    if (findIndex === -1) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Invalid productId");
                    }
                    arr = __spreadArray([], foundUser.products, true);
                    if (!(((_b = arr[findIndex].creatorUser) === null || _b === void 0 ? void 0 : _b._id.toString()) === foundUser._id.toString())) return [3 /*break*/, 4];
                    return [4 /*yield*/, product_1.ProductModel.findByIdAndDelete(arr[findIndex]._id)];
                case 3:
                    _c.sent();
                    _c.label = 4;
                case 4:
                    arr = __spreadArray(__spreadArray([], arr.slice(0, findIndex), true), arr.slice(findIndex + 1), true);
                    foundUser.products = __spreadArray([], arr, true);
                    return [4 /*yield*/, user_1.UserModel.findByIdAndUpdate(req.params.id, foundUser)];
                case 5:
                    _c.sent();
                    return [2 /*return*/, foundUser];
            }
        });
    }); },
    addMeasurementRow: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var foundUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    foundUser = req.user;
                    if (!(req.params.id !== foundUser._id.toString())) return [3 /*break*/, 2];
                    return [4 /*yield*/, UserService.find({ _id: req.params.id })];
                case 1:
                    foundUser = _a.sent();
                    _a.label = 2;
                case 2:
                    if (!foundUser) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
                    }
                    if (foundUser.myMeasurements.length) {
                        foundUser.myMeasurements = __spreadArray(__spreadArray([], foundUser.myMeasurements, true), [
                            {
                                date: new Date(Date.now()),
                                data: foundUser.myMeasurements[0].data.map(function (d) { return (__assign(__assign({}, d), { value: "" })); }),
                            },
                        ], false);
                    }
                    else {
                        foundUser.myMeasurements = [
                            {
                                date: new Date(Date.now()),
                                data: [
                                    {
                                        key: "Вес",
                                        value: "",
                                    },
                                ],
                            },
                        ];
                    }
                    return [4 /*yield*/, user_1.UserModel.findByIdAndUpdate(req.params.id, foundUser)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, foundUser];
            }
        });
    }); },
    removeMeasurementRow: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var foundUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    foundUser = req.user;
                    if (!(req.params.id !== foundUser._id.toString())) return [3 /*break*/, 2];
                    return [4 /*yield*/, UserService.find({ _id: req.params.id })];
                case 1:
                    foundUser = _a.sent();
                    _a.label = 2;
                case 2:
                    if (!foundUser) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
                    }
                    if (!foundUser.myMeasurements.length) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Empty measurements");
                    }
                    foundUser.myMeasurements = foundUser.myMeasurements.slice(0, -1);
                    return [4 /*yield*/, user_1.UserModel.findByIdAndUpdate(req.params.id, foundUser)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, foundUser];
            }
        });
    }); },
    addMeasurementKey: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var foundUser, key;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    foundUser = req.user;
                    if (!(req.params.id !== foundUser._id.toString())) return [3 /*break*/, 2];
                    return [4 /*yield*/, UserService.find({ _id: req.params.id })];
                case 1:
                    foundUser = _a.sent();
                    _a.label = 2;
                case 2:
                    if (!foundUser) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
                    }
                    if (!foundUser.myMeasurements.length) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Empty measurements");
                    }
                    key = req.body.key;
                    if (foundUser.myMeasurements[0].data.find(function (d) { return d.key === key; })) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid measurement key");
                    }
                    foundUser.myMeasurements = foundUser.myMeasurements.map(function (m) { return (__assign(__assign({}, m), { data: __spreadArray(__spreadArray([], m.data, true), [{ key: key, value: "" }], false) })); });
                    return [4 /*yield*/, user_1.UserModel.findByIdAndUpdate(req.params.id, foundUser)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, foundUser];
            }
        });
    }); },
    removeMeasurementKey: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var foundUser, key;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    foundUser = req.user;
                    if (!(req.params.id !== foundUser._id.toString())) return [3 /*break*/, 2];
                    return [4 /*yield*/, UserService.find({ _id: req.params.id })];
                case 1:
                    foundUser = _a.sent();
                    _a.label = 2;
                case 2:
                    if (!foundUser) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
                    }
                    if (!foundUser.myMeasurements.length) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Empty measurements");
                    }
                    key = req.body.key;
                    if (!foundUser.myMeasurements[0].data.find(function (d) { return d.key === key; })) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Invalid measurement key");
                    }
                    foundUser.myMeasurements = foundUser.myMeasurements.map(function (m) { return (__assign(__assign({}, m), { data: m.data.filter(function (d) { return d.key !== key; }) })); });
                    return [4 /*yield*/, user_1.UserModel.findByIdAndUpdate(req.params.id, foundUser)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, foundUser];
            }
        });
    }); },
    setMeasurementValue: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var foundUser, _a, key, value, index;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    foundUser = req.user;
                    if (!(req.params.id !== foundUser._id.toString())) return [3 /*break*/, 2];
                    return [4 /*yield*/, UserService.find({ _id: req.params.id })];
                case 1:
                    foundUser = _b.sent();
                    _b.label = 2;
                case 2:
                    if (!foundUser) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
                    }
                    if (!foundUser.myMeasurements.length) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Empty measurements");
                    }
                    _a = req.body, key = _a.key, value = _a.value, index = _a.index;
                    if (!foundUser.myMeasurements[0].data.find(function (d) { return d.key === key; })) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Invalid measurement key");
                    }
                    if (!foundUser.myMeasurements[index]) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid index");
                    }
                    foundUser.myMeasurements[index].data = foundUser.myMeasurements[index].data.map(function (d) {
                        if (d.key === key) {
                            d.value = value;
                        }
                        return d;
                    });
                    return [4 /*yield*/, user_1.UserModel.findByIdAndUpdate(req.params.id, foundUser)];
                case 3:
                    _b.sent();
                    return [2 /*return*/, foundUser];
            }
        });
    }); },
    setMeasurementDate: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var foundUser, _a, index, _b, year, month, day;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    foundUser = req.user;
                    if (!(req.params.id !== foundUser._id.toString())) return [3 /*break*/, 2];
                    return [4 /*yield*/, UserService.find({ _id: req.params.id })];
                case 1:
                    foundUser = _c.sent();
                    _c.label = 2;
                case 2:
                    if (!foundUser) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
                    }
                    if (!foundUser.myMeasurements.length) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Empty measurements");
                    }
                    _a = req.body, index = _a.index, _b = _a.date, year = _b.year, month = _b.month, day = _b.day;
                    if (!foundUser.myMeasurements[index]) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid index");
                    }
                    foundUser.myMeasurements[index].date = new Date("".concat(year, "-").concat(month, "-").concat(day));
                    return [4 /*yield*/, user_1.UserModel.findByIdAndUpdate(req.params.id, foundUser)];
                case 3:
                    _c.sent();
                    return [2 /*return*/, foundUser];
            }
        });
    }); },
    setSchemaNutrition: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var foundUser, _a, _b, year, month, day, _c, nType, dailyNorm, amount, proteinPercent, oilPercent, mergeAmount, mergeCarb, products, amountsP, dishes, amountsD, l, foundProduct, l, foundDish, obj, index;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    foundUser = req.user;
                    if (!(req.params.id !== foundUser._id.toString())) return [3 /*break*/, 2];
                    return [4 /*yield*/, UserService.find({ _id: req.params.id })];
                case 1:
                    foundUser = _d.sent();
                    _d.label = 2;
                case 2:
                    if (!foundUser) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
                    }
                    _a = req.body, _b = _a.date, year = _b.year, month = _b.month, day = _b.day, _c = _a.data, nType = _c.nType, dailyNorm = _c.dailyNorm, amount = _c.amount, proteinPercent = _c.proteinPercent, oilPercent = _c.oilPercent, mergeAmount = _c.mergeAmount, mergeCarb = _c.mergeCarb, products = _a.products, amountsP = _a.amountsP, dishes = _a.dishes, amountsD = _a.amountsD;
                    if (products.length !== amountsP.length ||
                        dishes.length !== amountsD.length) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid amounts");
                    }
                    l = 0;
                    _d.label = 3;
                case 3:
                    if (!(l < products.length)) return [3 /*break*/, 6];
                    return [4 /*yield*/, product_1.ProductModel.findById(products[l])];
                case 4:
                    foundProduct = _d.sent();
                    if (!foundProduct) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Product not found");
                    }
                    _d.label = 5;
                case 5:
                    l++;
                    return [3 /*break*/, 3];
                case 6:
                    l = 0;
                    _d.label = 7;
                case 7:
                    if (!(l < dishes.length)) return [3 /*break*/, 10];
                    return [4 /*yield*/, dish_1.DishModel.findById(dishes[l])];
                case 8:
                    foundDish = _d.sent();
                    if (!foundDish) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Dish not found");
                    }
                    _d.label = 9;
                case 9:
                    l++;
                    return [3 /*break*/, 7];
                case 10:
                    obj = {
                        date: new Date("".concat(year, "-").concat(month, "-").concat(day)),
                        data: {
                            nType: nType,
                            dailyNorm: Number(dailyNorm),
                            amount: Number(amount),
                            proteinPercent: Number(proteinPercent),
                            oilPercent: Number(oilPercent),
                            mergeAmount: Number(mergeAmount),
                            mergeCarb: Number(mergeCarb),
                        },
                        products: products,
                        amountsP: amountsP,
                        dishes: dishes,
                        amountsD: amountsD,
                    };
                    index = foundUser.schemaNutritions
                        .map(function (sN) {
                        var datee = new Date(sN.date);
                        var yearr = datee.getFullYear();
                        var monthh = datee.getMonth() + 1;
                        var dayy = datee.getDate();
                        return { yearr: yearr, monthh: monthh, dayy: dayy };
                    })
                        .findIndex(function (_a) {
                        var yearr = _a.yearr, monthh = _a.monthh, dayy = _a.dayy;
                        return yearr === year && monthh === month && dayy === day;
                    });
                    if (index === -1) {
                        foundUser.schemaNutritions = __spreadArray(__spreadArray([], foundUser.schemaNutritions, true), [obj], false);
                    }
                    else {
                        foundUser.schemaNutritions[index] = __assign(__assign({}, foundUser.schemaNutritions[index]), obj);
                        // if (products.length === 0 && dishes.length === 0) {
                        //   foundUser.schemaNutritions = [
                        //     ...foundUser.schemaNutritions.slice(0, index),
                        //     ...foundUser.schemaNutritions.slice(index + 1),
                        //   ];
                        // } else {
                        //   /// ....
                        // }
                    }
                    return [4 /*yield*/, user_1.UserModel.findByIdAndUpdate(req.params.id, foundUser)];
                case 11:
                    _d.sent();
                    return [2 /*return*/, foundUser];
            }
        });
    }); },
    setScheduleWorkout: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var foundUser, plan, results, i, weekResults, j, workoutResults, k, approachResults, l;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    foundUser = req.user;
                    if (!(req.params.id !== foundUser._id.toString())) return [3 /*break*/, 2];
                    return [4 /*yield*/, UserService.find({ _id: req.params.id })];
                case 1:
                    foundUser = _a.sent();
                    _a.label = 2;
                case 2:
                    if (!foundUser) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
                    }
                    return [4 /*yield*/, workout_1.WorkoutPlanModel.findById(req.body.planId)];
                case 3:
                    plan = _a.sent();
                    if (!plan) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "WorkoutPlan not found");
                    }
                    if (foundUser.scheduleWorkouts.find(function (s) { return !s.isFinished; })) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "User already have schedule workout");
                    }
                    results = [];
                    for (i = 0; i < plan.workouts.length; i++) {
                        weekResults = [];
                        for (j = 0; j < plan.week; j++) {
                            workoutResults = [];
                            for (k = 0; k < plan.workouts[i].length; k++) {
                                approachResults = [];
                                for (l = 0; l < plan.workouts[i][k].approach; l++) {
                                    approachResults.push({
                                        weight: 0,
                                        repeat: 0,
                                    });
                                }
                                workoutResults.push(approachResults);
                            }
                            weekResults.push(workoutResults);
                        }
                        results.push(weekResults);
                    }
                    foundUser.scheduleWorkouts = __spreadArray(__spreadArray([], foundUser.scheduleWorkouts, true), [
                        {
                            isFinished: false,
                            activeWeek: 0,
                            plan: plan,
                            results: results,
                        },
                    ], false);
                    return [4 /*yield*/, user_1.UserModel.findByIdAndUpdate(req.params.id, foundUser)];
                case 4:
                    _a.sent();
                    return [2 /*return*/, foundUser];
            }
        });
    }); },
    setWorkoutResult: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var foundUser, foundIndex, found, _a, group, week, workout, approach, weight, repeat, results, i, j, k, l;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    foundUser = req.user;
                    if (!(req.params.id !== foundUser._id.toString())) return [3 /*break*/, 2];
                    return [4 /*yield*/, UserService.find({ _id: req.params.id })];
                case 1:
                    foundUser = _b.sent();
                    _b.label = 2;
                case 2:
                    if (!foundUser) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
                    }
                    foundIndex = foundUser.scheduleWorkouts.findIndex(function (s) { return !s.isFinished; });
                    if (foundIndex === -1) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "User has not schedule workout yet");
                    }
                    found = __assign({}, foundUser.scheduleWorkouts[foundIndex]._doc);
                    _a = req.body, group = _a.group, week = _a.week, workout = _a.workout, approach = _a.approach, weight = _a.weight, repeat = _a.repeat;
                    if (found.results.length <= group) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid group value");
                    }
                    if (found.results[group].length <= week) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid week value");
                    }
                    if (found.results[group][week].length <= workout) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid workout value");
                    }
                    if (found.results[group][week][workout].length <= approach) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid approach value");
                    }
                    results = __spreadArray([], found.results, true);
                    for (i = 0; i < results.length; i++) {
                        for (j = 0; j < results[i].length; j++) {
                            for (k = 0; k < results[i][j].length; k++) {
                                for (l = 0; l < results[i][j][k].length; l++) {
                                    if (i === Number(group) &&
                                        j === Number(week) &&
                                        k === Number(workout) &&
                                        l === Number(approach)) {
                                        results[i][j][k][l] = {
                                            weight: Number(weight),
                                            repeat: Number(repeat),
                                        };
                                    }
                                }
                            }
                        }
                    }
                    found.results = __spreadArray([], results, true);
                    foundUser.scheduleWorkouts[foundIndex] = __assign({}, found);
                    return [4 /*yield*/, user_1.UserModel.findByIdAndUpdate(req.params.id, foundUser)];
                case 3:
                    _b.sent();
                    return [2 /*return*/, foundUser];
            }
        });
    }); },
    finishScheduleWorkout: function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var foundUser, foundIndex, found;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    foundUser = req.user;
                    if (!(req.params.id !== foundUser._id.toString())) return [3 /*break*/, 2];
                    return [4 /*yield*/, UserService.find({ _id: req.params.id })];
                case 1:
                    foundUser = _a.sent();
                    _a.label = 2;
                case 2:
                    if (!foundUser) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
                    }
                    foundIndex = foundUser.scheduleWorkouts.findIndex(function (s) { return !s.isFinished; });
                    if (foundIndex === -1) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "User has not schedule workout yet");
                    }
                    found = foundUser.scheduleWorkouts[foundIndex];
                    found.activeWeek = found.activeWeek + 4;
                    if (found.activeWeek === found.plan.week) {
                        found.isFinished = true;
                    }
                    return [4 /*yield*/, user_1.UserModel.findByIdAndUpdate(req.params.id, foundUser)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, foundUser];
            }
        });
    }); },
    delete: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var user, i, trainer, i, workoutPlan, i, product;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, UserService.find({ _id: id })];
                case 1:
                    user = _c.sent();
                    if (!user) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
                    }
                    return [4 /*yield*/, otp_1.OtpModel.deleteOne({ phone: user.phoneNumber })];
                case 2:
                    _c.sent();
                    i = 0;
                    _c.label = 3;
                case 3:
                    if (!(i < user.myTrainers.length)) return [3 /*break*/, 7];
                    return [4 /*yield*/, trainer_1.TrainerModel.findById(user.myTrainers[i]._id)];
                case 4:
                    trainer = _c.sent();
                    if (!(trainer && user)) return [3 /*break*/, 6];
                    trainer.requestedDisciples = (_a = trainer.requestedDisciples) === null || _a === void 0 ? void 0 : _a.filter(function (d) { return d._id.toString() !== user._id.toString(); });
                    trainer.disciples = (_b = trainer.disciples) === null || _b === void 0 ? void 0 : _b.filter(function (d) { return d._id.toString() !== user._id.toString(); });
                    return [4 /*yield*/, trainer_1.TrainerModel.findByIdAndUpdate(trainer._id, trainer)];
                case 5:
                    _c.sent();
                    _c.label = 6;
                case 6:
                    i++;
                    return [3 /*break*/, 3];
                case 7:
                    i = 0;
                    _c.label = 8;
                case 8:
                    if (!(i < user.workoutPlans.length)) return [3 /*break*/, 12];
                    return [4 /*yield*/, workout_1.WorkoutPlanModel.findById(user.workoutPlans[i]._id)];
                case 9:
                    workoutPlan = _c.sent();
                    if (!(workoutPlan &&
                        workoutPlan.creatorUser &&
                        workoutPlan.creatorUser.toString() === user._id.toString())) return [3 /*break*/, 11];
                    return [4 /*yield*/, workout_1.WorkoutPlanModel.findByIdAndDelete(workoutPlan._id)];
                case 10:
                    _c.sent();
                    _c.label = 11;
                case 11:
                    i++;
                    return [3 /*break*/, 8];
                case 12:
                    i = 0;
                    _c.label = 13;
                case 13:
                    if (!(i < user.products.length)) return [3 /*break*/, 17];
                    return [4 /*yield*/, product_1.ProductModel.findById(user.products[i]._id)];
                case 14:
                    product = _c.sent();
                    if (!(product &&
                        product.creatorUser &&
                        product.creatorUser.toString() === user._id.toString())) return [3 /*break*/, 16];
                    return [4 /*yield*/, product_1.ProductModel.findByIdAndDelete(product._id)];
                case 15:
                    _c.sent();
                    _c.label = 16;
                case 16:
                    i++;
                    return [3 /*break*/, 13];
                case 17: return [4 /*yield*/, user_1.UserModel.findByIdAndDelete(id)];
                case 18:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    }); },
};
exports.default = UserService;
//# sourceMappingURL=UserService.js.map