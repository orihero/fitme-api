"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutPlanController = void 0;
const http_status_codes_1 = require("http-status-codes");
const http_errors_1 = __importDefault(require("http-errors"));
const changeResponse_1 = require("./../utils/changeResponse");
const workout_1 = require("./../database/models/workout");
const model_1 = require("./../database/models/user/model");
const model_2 = require("./../database/models/trainer/model");
const model_3 = require("./../database/models/exercise/model");
class WorkoutPlanController {
    async find(req, res, next) {
        try {
            const result = await workout_1.WorkoutPlanModel.find().populate([
                "creatorTrainer",
                "creatorUser",
                {
                    path: "workouts",
                    populate: {
                        path: "exercise",
                        model: "Exercise",
                    },
                },
            ]);
            res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, result));
        }
        catch (e) {
            next(e);
        }
    }
    async create(req, res, next) {
        try {
            const { title, description, price, gender, level, week, creator, workouts, } = req.body;
            const foundUser = await model_1.UserModel.findById(creator);
            const foundTrainer = await model_2.TrainerModel.findById(creator);
            if (!(foundUser || foundTrainer)) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "creator not found");
            }
            for (let i = 0; i < workouts.length; i++) {
                for (let j = 0; j < workouts[i].length; j++) {
                    const foundExercise = await model_3.ExerciseModel.findById(workouts[i][j].exercise);
                    if (!foundExercise) {
                        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "exercise not found");
                    }
                }
            }
            let creatorr = {};
            if (foundUser) {
                creatorr.creatorUser = foundUser._id;
            }
            else {
                creatorr.creatorTrainer = foundTrainer?._id;
            }
            const created = await workout_1.WorkoutPlanModel.create({
                title,
                description,
                price,
                gender,
                level,
                week,
                workouts,
                ...creatorr,
            });
            if (foundUser) {
                // @ts-ignore
                foundUser.workoutPlans = [...foundUser.workoutPlans, created._id];
                await foundUser.save();
            }
            if (foundTrainer) {
                // @ts-ignore
                foundTrainer.workoutPlans = [...foundTrainer.workoutPlans, created._id];
                await foundTrainer.save();
            }
            res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, created));
        }
        catch (e) {
            next(e);
        }
    }
    async findOne(req, res, next) {
        try {
            const found = await workout_1.WorkoutPlanModel.findById(req.params.id).populate([
                "creatorTrainer",
                "creatorUser",
                {
                    path: "workouts",
                    populate: {
                        path: "exercise",
                        model: "Exercise",
                    },
                },
            ]);
            if (!found) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "workoutplan not found");
            }
            res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, found));
        }
        catch (e) {
            next(e);
        }
    }
    async update(req, res, next) {
        try {
            console.log("update workoutPlan");
            res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, { a: "aa" }));
        }
        catch (e) {
            next(e);
        }
    }
    async delete(req, res, next) {
        try {
            const foundWorkoutPlan = await workout_1.WorkoutPlanModel.findById(req.params.id);
            if (!foundWorkoutPlan) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "workoutplan not found");
            }
            if (foundWorkoutPlan.creatorTrainer) {
                const trainer = await model_2.TrainerModel.findById(foundWorkoutPlan.creatorTrainer);
                if (trainer) {
                    // @ts-ignore
                    trainer.workoutPlans = trainer.workoutPlans.filter(
                    // @ts-ignore
                    (a) => a.toString() !== req.params.id);
                    await trainer.save();
                }
            }
            if (foundWorkoutPlan.creatorUser) {
                const user = await model_1.UserModel.findById(foundWorkoutPlan.creatorUser);
                if (user) {
                    // @ts-ignore
                    user.workoutPlans = user.workoutPlans.filter(
                    // @ts-ignore
                    (a) => a.toString() !== req.params.id);
                    await user.save();
                }
            }
            await workout_1.WorkoutPlanModel.findByIdAndDelete(req.params.id);
            res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, null));
        }
        catch (e) {
            next(e);
        }
    }
}
exports.WorkoutPlanController = WorkoutPlanController;
