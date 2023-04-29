"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const model_1 = require("./../database/models/user/model");
const changeResponse_1 = require("./../utils/changeResponse");
class UserController {
    async find(req, res, next) {
        try {
            const result = await model_1.UserModel.find().populate([
                "myTrainers",
                "workoutPlans",
            ]);
            res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, result));
        }
        catch (e) {
            next(e);
        }
    }
    async create(req, res, next) {
        try {
            const { phoneNumber, name } = req.body;
            const foundUser = await model_1.UserModel.findOne({
                $or: [
                    {
                        name,
                    },
                    {
                        phoneNumber,
                    },
                ],
            });
            if (foundUser) {
                if (foundUser.name === name) {
                    throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, `User with "${name}" already created`);
                }
                if (foundUser.phoneNumber === phoneNumber) {
                    throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, `User with "${phoneNumber}" already created`);
                }
            }
            const saved = await model_1.UserModel.create({
                name,
                phoneNumber,
            });
            res.status(http_status_codes_1.StatusCodes.CREATED).json((0, changeResponse_1.changeResponse)(true, saved));
        }
        catch (e) {
            next(e);
        }
    }
    async findOne(req, res, next) {
        try {
            const found = await model_1.UserModel.findById(req.params.id).populate([
                "myTrainers",
                "workoutPlans",
            ]);
            if (!found) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
            }
            res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, found));
        }
        catch (e) {
            next(e);
        }
    }
    async updateName(req, res, next) {
        try {
            const found = await model_1.UserModel.findById(req.params.id);
            if (!found) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
            }
            found.name = req.body.name;
            await found.save();
            // @ts-ignore
            res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, { ...found._doc }));
        }
        catch (e) {
            next(e);
        }
    }
    async updateNumber(req, res, next) {
        try {
            const found = await model_1.UserModel.findById(req.params.id);
            if (!found) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
            }
            found.phoneNumber = req.body.phoneNumber;
            await found.save();
            // @ts-ignore
            res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, { ...found._doc }));
        }
        catch (e) {
            next(e);
        }
    }
    async updateProAccount(req, res, next) {
        try {
            console.log("proAccount");
            const found = await model_1.UserModel.findById(req.params.id);
            if (!found) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
            }
            found.isProAccount = !found.isProAccount;
            await found.save();
            // @ts-ignore
            res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, { ...found._doc }));
        }
        catch (e) {
            next(e);
        }
    }
    async delete(req, res, next) {
        try {
            const deleted = await model_1.UserModel.deleteOne({ _id: req.params.id });
            if (!deleted.deletedCount) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
            }
            res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, null));
        }
        catch (e) {
            next(e);
        }
    }
}
exports.UserController = UserController;
