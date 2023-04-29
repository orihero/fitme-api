"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainerController = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const trainer_1 = require("../database/models/trainer");
const changeResponse_1 = require("./../utils/changeResponse");
const model_1 = require("./../database/models/user/model");
class TrainerController {
    async find(req, res, next) {
        try {
            const result = await trainer_1.TrainerModel.find().populate([
                "requestedDisciples",
                "disciples",
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
            const { phoneNumber, name, email, ...rest } = req.body;
            const foundTrainer = await trainer_1.TrainerModel.findOne({
                $or: [
                    {
                        name,
                    },
                    {
                        email,
                    },
                    {
                        phoneNumber,
                    },
                ],
            });
            if (foundTrainer) {
                let wrong = "";
                if (foundTrainer.name === name) {
                    wrong = name;
                }
                if (foundTrainer.email === email) {
                    wrong = email;
                }
                if (foundTrainer.phoneNumber === phoneNumber) {
                    wrong = phoneNumber;
                }
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, `Trainer with "${wrong}" already created`);
            }
            const saved = await trainer_1.TrainerModel.create({
                name,
                email,
                phoneNumber,
                ...rest,
            });
            res.status(http_status_codes_1.StatusCodes.CREATED).json((0, changeResponse_1.changeResponse)(true, saved));
        }
        catch (e) {
            next(e);
        }
    }
    async findOne(req, res, next) {
        try {
            const found = await trainer_1.TrainerModel.findById(req.params.id).populate([
                "requestedDisciples",
                "disciples",
                "workoutPlans",
            ]);
            if (!found) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Trainer not found");
            }
            res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, found));
        }
        catch (e) {
            next(e);
        }
    }
    async update(req, res, next) {
        try {
            const { id: _id } = req.params;
            const updated = await trainer_1.TrainerModel.updateOne({ _id }, { ...req.body });
            if (!updated.modifiedCount) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Trainer not found");
            }
            res
                .status(http_status_codes_1.StatusCodes.OK)
                .json((0, changeResponse_1.changeResponse)(true, { ...req.body, _id }));
        }
        catch (e) {
            next(e);
        }
    }
    async requestAddTrainer(req, res, next) {
        try {
            const { discipleId } = req.body;
            const foundTrainer = await trainer_1.TrainerModel.findById(req.params.id);
            if (!foundTrainer) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Trainer not found");
            }
            const foundUser = await model_1.UserModel.findById(discipleId);
            if (!foundUser) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
            }
            foundTrainer.requestedDisciples = [
                // @ts-ignore
                ...foundTrainer.requestedDisciples,
                // @ts-ignore
                foundUser,
            ];
            await foundTrainer.save();
            res
                .status(http_status_codes_1.StatusCodes.OK)
                .json((0, changeResponse_1.changeResponse)(true, { message: "Request sent to trainer" }));
        }
        catch (e) {
            next(e);
        }
    }
    async addDisciple(req, res, next) {
        try {
            const { discipleId } = req.body;
            const foundTrainer = await trainer_1.TrainerModel.findById(req.params.id);
            if (!foundTrainer) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Trainer not found");
            }
            const foundUser = foundTrainer.requestedDisciples.find((a) => a.toString() === discipleId);
            if (!foundUser) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "User has not requested yet");
            }
            const user = await model_1.UserModel.findById(discipleId);
            foundTrainer.requestedDisciples = foundTrainer.requestedDisciples.filter((a) => a._id === discipleId);
            foundTrainer.disciples = [...foundTrainer.disciples, foundUser];
            await foundTrainer.save();
            // @ts-ignore
            user.myTrainers = [...user?.myTrainers, foundTrainer];
            await user?.save();
            res
                .status(http_status_codes_1.StatusCodes.OK)
                .json((0, changeResponse_1.changeResponse)(true, { message: "User successfully added" }));
        }
        catch (e) {
            console.log("e: ", e);
            next(e);
        }
    }
    async removeDisciple(req, res, next) {
        try {
            const { discipleId } = req.body;
            const foundTrainer = await trainer_1.TrainerModel.findById(req.params.id);
            if (!foundTrainer) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Trainer not found");
            }
            const foundUser = await model_1.UserModel.findById(discipleId);
            if (!foundUser) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
            }
            foundTrainer.disciples = foundTrainer.disciples.filter((a) => a._id.toString() !== discipleId);
            foundTrainer.requestedDisciples = foundTrainer.requestedDisciples.filter((a) => a._id.toString() !== discipleId);
            foundUser.myTrainers = foundUser.myTrainers?.filter((a) => a._id.toString() !== req.params.id);
            await foundTrainer.save();
            await foundUser.save();
            res
                .status(http_status_codes_1.StatusCodes.OK)
                .json((0, changeResponse_1.changeResponse)(true, { message: "User successfully removed" }));
        }
        catch (e) {
            next(e);
        }
    }
    async delete(req, res, next) {
        try {
            const deleted = await trainer_1.TrainerModel.deleteOne({ _id: req.params.id });
            if (!deleted.deletedCount) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Trainer not found");
            }
            res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, null));
        }
        catch (e) {
            next(e);
        }
    }
}
exports.TrainerController = TrainerController;
