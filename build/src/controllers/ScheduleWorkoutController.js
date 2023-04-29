"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleWorkoutController = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const changeResponse_1 = require("./../utils/changeResponse");
const schedule_workout_1 = require("./../database/models/schedule-workout");
const model_1 = require("./../database/models/workout/model");
const model_2 = require("./../database/models/user/model");
class ScheduleWorkoutController {
    async find(req, res, next) {
        try {
            const result = await schedule_workout_1.ScheduleWorkoutModel.find().populate([
                "plan",
                "executor",
            ]);
            res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, result));
        }
        catch (e) {
            next(e);
        }
    }
    async create(req, res, next) {
        try {
            const { plan, executor } = req.body;
            const foundPlan = await model_1.WorkoutPlanModel.findById(plan);
            if (!foundPlan) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Plan not found");
            }
            const foundExecutor = await model_2.UserModel.findById(executor);
            if (!foundExecutor) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Executor not found");
            }
            let results = [];
            for (let i = 0; i < foundPlan.workouts.length; i++) {
                let weekResults = [];
                for (let j = 0; j < foundPlan.week; j++) {
                    let workoutResults = [];
                    for (let k = 0; k < foundPlan.workouts[i].length; k++) {
                        let approachResults = [];
                        for (let l = 0; l < foundPlan.workouts[i][k].approach; l++) {
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
            const created = await schedule_workout_1.ScheduleWorkoutModel.create({
                plan,
                executor,
                results,
            });
            res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, created));
        }
        catch (e) {
            next(e);
        }
    }
    async findOne(req, res, next) {
        try {
            const found = await schedule_workout_1.ScheduleWorkoutModel.findById(req.params.id).populate(["plan", "executor"]);
            if (!found) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "ScheduleWorkout not found");
            }
            res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, found));
        }
        catch (e) {
            next(e);
        }
    }
    async update(req, res, next) {
        try {
            console.log("update scheduleWorkout");
            res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, { a: "aa" }));
        }
        catch (e) {
            next(e);
        }
    }
    async delete(req, res, next) {
        try {
            const deleted = await schedule_workout_1.ScheduleWorkoutModel.deleteOne({
                _id: req.params.id,
            });
            if (!deleted.deletedCount) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "ScheduleWorkout not found");
            }
            res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, null));
        }
        catch (e) {
            next(e);
        }
    }
}
exports.ScheduleWorkoutController = ScheduleWorkoutController;
