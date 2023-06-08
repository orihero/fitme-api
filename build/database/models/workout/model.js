"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutPlanModel = void 0;
var mongoose_1 = require("mongoose");
var common_1 = require("./../../../types/common");
var workoutPlanSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        enum: [common_1.GENDER.ALL, common_1.GENDER.MALE, common_1.GENDER.FEMALE],
        default: common_1.GENDER.MALE,
    },
    level: {
        type: String,
        enum: [common_1.LEVEL.NEWBIE, common_1.LEVEL.EXPERIENCED, common_1.LEVEL.ADVANCED],
        default: common_1.LEVEL.NEWBIE,
    },
    week: {
        type: Number,
        required: true,
    },
    creatorTrainer: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: "Trainer",
        required: false,
    },
    creatorUser: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: "User",
        required: false,
    },
    workouts: {
        type: [
            [
                {
                    exercise: {
                        type: mongoose_1.SchemaTypes.ObjectId,
                        ref: "Exercise",
                    },
                    approach: {
                        type: Number,
                        required: true,
                    },
                    repetitions: {
                        type: String,
                        required: true,
                    },
                },
            ],
        ],
    },
}, { timestamps: true });
exports.WorkoutPlanModel = (0, mongoose_1.model)("WorkoutPlan", workoutPlanSchema);
//# sourceMappingURL=model.js.map