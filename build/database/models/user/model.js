"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
var common_1 = require("./../../../types/common");
var userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: [common_1.ROLES.SUPERADMIN, common_1.ROLES.ADMIN, common_1.ROLES.TRAINER, common_1.ROLES.USER],
        default: common_1.ROLES.USER,
    },
    isProAccount: {
        type: Boolean,
        default: false,
    },
    myTrainers: {
        type: [mongoose_1.SchemaTypes.ObjectId],
        ref: "Trainer",
    },
    favoriteExercises: {
        type: [mongoose_1.SchemaTypes.ObjectId],
        ref: "Exercise",
    },
    workoutPlans: {
        type: [mongoose_1.SchemaTypes.ObjectId],
        ref: "WorkoutPlan",
    },
    scheduleWorkouts: [
        {
            isFinished: {
                type: Boolean,
                required: true,
            },
            activeWeek: {
                type: Number,
                required: true,
            },
            plan: {
                type: mongoose_1.SchemaTypes.ObjectId,
                ref: "WorkoutPlan",
            },
            results: [
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
        },
    ],
    products: {
        type: [mongoose_1.SchemaTypes.ObjectId],
        ref: "Product",
    },
    dishes: {
        type: [mongoose_1.SchemaTypes.ObjectId],
        ref: "Dish",
    },
    nutritionPlans: {
        type: [mongoose_1.SchemaTypes.ObjectId],
        ref: "NutritionPlan",
    },
    schemaNutritions: [
        {
            date: Date,
            data: {
                dailyNorm: Number,
                amount: Number,
                proteinPercent: Number,
                oilPercent: Number,
                mergeAmount: Number,
                mergeCarb: Number,
                nType: String,
            },
            products: {
                type: [mongoose_1.SchemaTypes.ObjectId],
                ref: "Product",
            },
            amountsP: [Number],
            dishes: {
                type: [mongoose_1.SchemaTypes.ObjectId],
                ref: "Dish",
            },
            amountsD: [Number],
        },
    ],
    myMeasurements: [
        {
            date: Date,
            data: [
                {
                    key: String,
                    value: String,
                },
            ],
        },
    ],
}, { timestamps: true });
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=model.js.map