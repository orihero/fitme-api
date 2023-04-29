"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleWorkoutModel = void 0;
const mongoose_1 = require("mongoose");
const scheduleWorkoutSchema = new mongoose_1.Schema({
    plan: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: "WorkoutPlan",
        required: true,
    },
    executor: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
    results: {
        type: [
            [
                [
                    [
                        {
                            weight: {
                                type: Number,
                                required: true,
                            },
                            repeat: {
                                type: Number,
                                required: true,
                            },
                        },
                    ],
                ],
            ],
        ],
        required: true,
    },
}, { timestamps: true });
exports.ScheduleWorkoutModel = (0, mongoose_1.model)("ScheduleWorkout", scheduleWorkoutSchema);
