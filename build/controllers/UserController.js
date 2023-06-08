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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var http_errors_1 = __importDefault(require("http-errors"));
var http_status_codes_1 = require("http-status-codes");
var changeResponse_1 = require("./../utils/changeResponse");
var services_1 = require("./../services");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.me = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, createdAt, updatedAt, rest;
            return __generator(this, function (_c) {
                try {
                    _b = (_a = req.user) !== null && _a !== void 0 ? _a : {}, createdAt = _b.createdAt, updatedAt = _b.updatedAt, rest = __rest(_b, ["createdAt", "updatedAt"]);
                    // @ts-ignore
                    res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, rest._doc));
                }
                catch (e) {
                    next(e);
                }
                return [2 /*return*/];
            });
        });
    };
    UserController.prototype.find = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.UserService.findAll()];
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
    UserController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var saved, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.UserService.create(req.body)];
                    case 1:
                        saved = _a.sent();
                        res.status(http_status_codes_1.StatusCodes.CREATED).json((0, changeResponse_1.changeResponse)(true, saved));
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
    UserController.prototype.findOne = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var found, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        found = req.user;
                        if (!(req.params.id !== found._id.toString())) return [3 /*break*/, 2];
                        return [4 /*yield*/, services_1.UserService.find({ _id: req.params.id })];
                    case 1:
                        // @ts-ignore
                        found = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!found) {
                            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
                        }
                        res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, found));
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        next(e_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.updateName = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var updated, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.UserService.updateName(req)];
                    case 1:
                        updated = _a.sent();
                        res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, updated));
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
    UserController.prototype.updateNumber = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var updated, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.UserService.updateNumber(req)];
                    case 1:
                        updated = _a.sent();
                        res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, updated));
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
    UserController.prototype.updateProAccount = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var updated, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.UserService.updateProAccount(req)];
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
    UserController.prototype.addWorkoutPlan = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var updated, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.UserService.addWorkoutPlan(req)];
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
    UserController.prototype.removeWorkoutPlan = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var updated, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.UserService.removeWorkoutPlan(req)];
                    case 1:
                        updated = _a.sent();
                        res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, updated));
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
    UserController.prototype.addFavoriteExercise = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var updated, e_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.UserService.addFavoriteExercise(req)];
                    case 1:
                        updated = _a.sent();
                        res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, updated));
                        return [3 /*break*/, 3];
                    case 2:
                        e_9 = _a.sent();
                        next(e_9);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.removeFavoriteExercise = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var updated, e_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.UserService.removeFavoriteExercise(req)];
                    case 1:
                        updated = _a.sent();
                        res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, updated));
                        return [3 /*break*/, 3];
                    case 2:
                        e_10 = _a.sent();
                        next(e_10);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.addProduct = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var updated, e_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.UserService.addProduct(req)];
                    case 1:
                        updated = _a.sent();
                        res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, updated));
                        return [3 /*break*/, 3];
                    case 2:
                        e_11 = _a.sent();
                        next(e_11);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.removeProduct = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var updated, e_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.UserService.removeProduct(req)];
                    case 1:
                        updated = _a.sent();
                        res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, updated));
                        return [3 /*break*/, 3];
                    case 2:
                        e_12 = _a.sent();
                        next(e_12);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.addMeasurementRow = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var updated, e_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.UserService.addMeasurementRow(req)];
                    case 1:
                        updated = _a.sent();
                        res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, updated));
                        return [3 /*break*/, 3];
                    case 2:
                        e_13 = _a.sent();
                        next(e_13);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.removeMeasurementRow = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var updated, e_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.UserService.removeMeasurementRow(req)];
                    case 1:
                        updated = _a.sent();
                        res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, updated));
                        return [3 /*break*/, 3];
                    case 2:
                        e_14 = _a.sent();
                        next(e_14);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.addMeasurementKey = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var updated, e_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.UserService.addMeasurementKey(req)];
                    case 1:
                        updated = _a.sent();
                        res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, updated));
                        return [3 /*break*/, 3];
                    case 2:
                        e_15 = _a.sent();
                        next(e_15);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.removeMeasurementKey = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var updated, e_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.UserService.removeMeasurementKey(req)];
                    case 1:
                        updated = _a.sent();
                        res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, updated));
                        return [3 /*break*/, 3];
                    case 2:
                        e_16 = _a.sent();
                        next(e_16);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.setMeasurementValue = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var updated, e_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.UserService.setMeasurementValue(req)];
                    case 1:
                        updated = _a.sent();
                        res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, updated));
                        return [3 /*break*/, 3];
                    case 2:
                        e_17 = _a.sent();
                        next(e_17);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.setMeasurementDate = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var updated, e_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.UserService.setMeasurementDate(req)];
                    case 1:
                        updated = _a.sent();
                        res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, updated));
                        return [3 /*break*/, 3];
                    case 2:
                        e_18 = _a.sent();
                        next(e_18);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.setSchemaNutrition = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var updated, e_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.UserService.setSchemaNutrition(req)];
                    case 1:
                        updated = _a.sent();
                        res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, updated));
                        return [3 /*break*/, 3];
                    case 2:
                        e_19 = _a.sent();
                        next(e_19);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.setScheduleWorkout = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var updated, e_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.UserService.setScheduleWorkout(req)];
                    case 1:
                        updated = _a.sent();
                        res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, updated));
                        return [3 /*break*/, 3];
                    case 2:
                        e_20 = _a.sent();
                        next(e_20);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.setWorkoutResult = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var updated, e_21;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.UserService.setWorkoutResult(req)];
                    case 1:
                        updated = _a.sent();
                        res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, updated));
                        return [3 /*break*/, 3];
                    case 2:
                        e_21 = _a.sent();
                        next(e_21);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.finishScheduleWorkout = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var updated, e_22;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.UserService.finishScheduleWorkout(req)];
                    case 1:
                        updated = _a.sent();
                        res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, updated));
                        return [3 /*break*/, 3];
                    case 2:
                        e_22 = _a.sent();
                        next(e_22);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.delete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var e_23;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.UserService.delete(req.params.id)];
                    case 1:
                        _a.sent();
                        res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, null));
                        return [3 /*break*/, 3];
                    case 2:
                        e_23 = _a.sent();
                        next(e_23);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map