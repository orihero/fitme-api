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
exports.TrainerController = void 0;
var http_errors_1 = __importDefault(require("http-errors"));
var http_status_codes_1 = require("http-status-codes");
var trainer_1 = require("../database/models/trainer");
var changeResponse_1 = require("./../utils/changeResponse");
var model_1 = require("./../database/models/user/model");
var common_1 = require("./../types/common");
var services_1 = require("../services");
var TrainerController = /** @class */ (function () {
    function TrainerController() {
    }
    TrainerController.prototype.find = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var query, condition, result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
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
                        return [4 /*yield*/, trainer_1.TrainerModel.find(query).populate([
                                "requestedDisciples",
                                "disciples",
                                "workoutPlans",
                            ])];
                    case 1:
                        result = _a.sent();
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
    TrainerController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, phoneNumber, name_1, email, rest, foundTrainer, foundUser, wrong, saved, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = req.body, phoneNumber = _a.phoneNumber, name_1 = _a.name, email = _a.email, rest = __rest(_a, ["phoneNumber", "name", "email"]);
                        return [4 /*yield*/, trainer_1.TrainerModel.findOne({
                                $or: [
                                    {
                                        name: name_1,
                                    },
                                    {
                                        email: email,
                                    },
                                    {
                                        phoneNumber: phoneNumber,
                                    },
                                ],
                            })];
                    case 1:
                        foundTrainer = _b.sent();
                        return [4 /*yield*/, model_1.UserModel.findOne({ phoneNumber: phoneNumber })];
                    case 2:
                        foundUser = _b.sent();
                        if (foundTrainer || foundUser) {
                            wrong = "";
                            if (foundTrainer) {
                                if (foundTrainer.name === name_1) {
                                    wrong = name_1;
                                }
                                if (foundTrainer.email === email) {
                                    wrong = email;
                                }
                                if (foundTrainer.phoneNumber === phoneNumber) {
                                    wrong = phoneNumber;
                                }
                            }
                            if (foundUser) {
                                wrong = phoneNumber;
                            }
                            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Trainer with \"".concat(wrong, "\" already created"));
                        }
                        return [4 /*yield*/, trainer_1.TrainerModel.create(__assign({ name: name_1, email: email, phoneNumber: phoneNumber }, rest))];
                    case 3:
                        saved = _b.sent();
                        res.status(http_status_codes_1.StatusCodes.CREATED).json((0, changeResponse_1.changeResponse)(true, saved));
                        return [3 /*break*/, 5];
                    case 4:
                        e_2 = _b.sent();
                        console.log(e_2);
                        next(e_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TrainerController.prototype.findOne = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var found, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.TrainerService.find({ _id: req.params.id })];
                    case 1:
                        found = _a.sent();
                        if (!found) {
                            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Trainer not found");
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
    TrainerController.prototype.update = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, updated, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        _id = req.params.id;
                        return [4 /*yield*/, trainer_1.TrainerModel.updateOne({ _id: _id }, __assign({}, req.body))];
                    case 1:
                        updated = _a.sent();
                        if (!updated.modifiedCount) {
                            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Trainer not found");
                        }
                        res
                            .status(http_status_codes_1.StatusCodes.OK)
                            .json((0, changeResponse_1.changeResponse)(true, __assign(__assign({}, req.body), { _id: _id })));
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
    TrainerController.prototype.requestAddTrainer = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var discipleId, foundTrainer, foundUser, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        discipleId = req.body.discipleId;
                        return [4 /*yield*/, services_1.TrainerService.find({
                                _id: req.params.id,
                            })];
                    case 1:
                        foundTrainer = _a.sent();
                        if (!foundTrainer) {
                            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Trainer not found");
                        }
                        return [4 /*yield*/, model_1.UserModel.findById(discipleId)];
                    case 2:
                        foundUser = _a.sent();
                        if (!foundUser) {
                            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
                        }
                        foundTrainer.requestedDisciples = __spreadArray(__spreadArray([], foundTrainer.requestedDisciples, true), [
                            foundUser,
                        ], false);
                        return [4 /*yield*/, foundTrainer.save()];
                    case 3:
                        _a.sent();
                        res
                            .status(http_status_codes_1.StatusCodes.OK)
                            .json((0, changeResponse_1.changeResponse)(true, { message: "Request sent to trainer" }));
                        return [3 /*break*/, 5];
                    case 4:
                        e_5 = _a.sent();
                        next(e_5);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TrainerController.prototype.addDisciple = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var discipleId_1, foundTrainer, foundUser, user, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        discipleId_1 = req.body.discipleId;
                        return [4 /*yield*/, services_1.TrainerService.find({
                                _id: req.params.id,
                            })];
                    case 1:
                        foundTrainer = _a.sent();
                        if (!foundTrainer) {
                            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Trainer not found");
                        }
                        foundUser = foundTrainer.requestedDisciples.find(function (a) { return a._id.toString() === discipleId_1; });
                        if (!foundUser) {
                            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "User has not requested yet");
                        }
                        return [4 /*yield*/, services_1.UserService.find({ _id: discipleId_1 })];
                    case 2:
                        user = _a.sent();
                        foundTrainer.requestedDisciples = foundTrainer.requestedDisciples.filter(function (a) { return a._id.toString() !== discipleId_1; });
                        foundTrainer.disciples = __spreadArray(__spreadArray([], foundTrainer.disciples, true), [foundUser], false);
                        return [4 /*yield*/, foundTrainer.save()];
                    case 3:
                        _a.sent();
                        user.myTrainers = __spreadArray(__spreadArray([], user === null || user === void 0 ? void 0 : user.myTrainers, true), [foundTrainer], false);
                        return [4 /*yield*/, (user === null || user === void 0 ? void 0 : user.save())];
                    case 4:
                        _a.sent();
                        res
                            .status(http_status_codes_1.StatusCodes.OK)
                            .json((0, changeResponse_1.changeResponse)(true, { message: "User successfully added" }));
                        return [3 /*break*/, 6];
                    case 5:
                        e_6 = _a.sent();
                        next(e_6);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    TrainerController.prototype.removeDisciple = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var discipleId_2, foundTrainer, foundUser, e_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        discipleId_2 = req.body.discipleId;
                        return [4 /*yield*/, services_1.TrainerService.find({
                                _id: req.params.id,
                            })];
                    case 1:
                        foundTrainer = _b.sent();
                        if (!foundTrainer) {
                            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Trainer not found");
                        }
                        return [4 /*yield*/, services_1.UserService.find({
                                _id: discipleId_2,
                            })];
                    case 2:
                        foundUser = _b.sent();
                        if (!foundUser) {
                            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
                        }
                        foundTrainer.disciples = foundTrainer.disciples.filter(function (a) { return a._id.toString() !== discipleId_2; });
                        foundTrainer.requestedDisciples = foundTrainer.requestedDisciples.filter(function (a) { return a._id.toString() !== discipleId_2; });
                        foundUser.myTrainers = (_a = foundUser.myTrainers) === null || _a === void 0 ? void 0 : _a.filter(function (a) { return a._id.toString() !== req.params.id; });
                        return [4 /*yield*/, foundTrainer.save()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, foundUser.save()];
                    case 4:
                        _b.sent();
                        res
                            .status(http_status_codes_1.StatusCodes.OK)
                            .json((0, changeResponse_1.changeResponse)(true, { message: "User successfully removed" }));
                        return [3 /*break*/, 6];
                    case 5:
                        e_7 = _b.sent();
                        next(e_7);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    TrainerController.prototype.delete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.TrainerService.delete(req.params.id)];
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
    return TrainerController;
}());
exports.TrainerController = TrainerController;
//# sourceMappingURL=TrainerController.js.map