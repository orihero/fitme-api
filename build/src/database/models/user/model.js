"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const common_1 = require("./../../../types/common");
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
    myMeasurements: {
        type: [mongoose_1.SchemaTypes.ObjectId],
        ref: "Measurement",
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
}, { timestamps: true });
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
