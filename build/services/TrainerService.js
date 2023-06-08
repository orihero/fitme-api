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
var trainer_1 = require("../database/models/trainer");
var user_1 = require("../database/models/user");
var workout_1 = require("../database/models/workout");
var product_1 = require("../database/models/product");
var otp_1 = require("../database/models/otp");
var populate = [
    "requestedDisciples",
    "disciples",
    "workoutPlans",
    {
        path: "products",
        populate: ["category", "creatorUser", "creatorTrainer"],
    },
];
var TrainerService = {
    find: function (condition) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, trainer_1.TrainerModel.findOne(condition).populate(populate)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    delete: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var trainer, i, user, i, i;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, TrainerService.find({ _id: id })];
                case 1:
                    trainer = _b.sent();
                    if (!trainer) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Trainer not found");
                    }
                    return [4 /*yield*/, otp_1.OtpModel.deleteOne({ phone: trainer.phoneNumber })];
                case 2:
                    _b.sent();
                    i = 0;
                    _b.label = 3;
                case 3:
                    if (!(i < trainer.disciples.length)) return [3 /*break*/, 7];
                    return [4 /*yield*/, user_1.UserModel.findById(trainer.disciples[i]._id)];
                case 4:
                    user = _b.sent();
                    if (!(user && trainer)) return [3 /*break*/, 6];
                    user.myTrainers = (_a = user.myTrainers) === null || _a === void 0 ? void 0 : _a.filter(function (t) { return t._id.toString() !== trainer._id.toString(); });
                    return [4 /*yield*/, user_1.UserModel.findByIdAndUpdate(user._id, user)];
                case 5:
                    _b.sent();
                    _b.label = 6;
                case 6:
                    i++;
                    return [3 /*break*/, 3];
                case 7:
                    i = 0;
                    _b.label = 8;
                case 8:
                    if (!(i < trainer.workoutPlans.length)) return [3 /*break*/, 11];
                    return [4 /*yield*/, workout_1.WorkoutPlanModel.findByIdAndDelete(trainer.workoutPlans[i]._id)];
                case 9:
                    _b.sent();
                    _b.label = 10;
                case 10:
                    i++;
                    return [3 /*break*/, 8];
                case 11:
                    i = 0;
                    _b.label = 12;
                case 12:
                    if (!(i < trainer.products.length)) return [3 /*break*/, 15];
                    return [4 /*yield*/, product_1.ProductModel.findByIdAndDelete(trainer.products[i]._id)];
                case 13:
                    _b.sent();
                    _b.label = 14;
                case 14:
                    i++;
                    return [3 /*break*/, 12];
                case 15: return [4 /*yield*/, trainer_1.TrainerModel.findByIdAndDelete(id)];
                case 16:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); },
};
exports.default = TrainerService;
//# sourceMappingURL=TrainerService.js.map