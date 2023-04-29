"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainerModel = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("./../../../types/common");
const trainerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    role: {
        type: String,
        enum: [common_1.ROLES.SUPERADMIN, common_1.ROLES.ADMIN, common_1.ROLES.TRAINER, common_1.ROLES.USER],
        default: common_1.ROLES.TRAINER,
    },
    gender: {
        type: String,
        enum: [common_1.GENDER.MALE, common_1.GENDER.FEMALE, common_1.GENDER.ALL],
        default: common_1.GENDER.MALE,
    },
    age: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    speciality: {
        type: String,
        required: true,
    },
    education: {
        type: String,
        required: true,
    },
    aboutMe: {
        type: String,
        required: true,
    },
    telegramLink: {
        type: String,
        required: true,
    },
    instagramLink: {
        type: String,
        required: true,
    },
    requestedDisciples: {
        type: [mongoose_1.SchemaTypes.ObjectId],
        ref: "User",
    },
    disciples: {
        type: [mongoose_1.SchemaTypes.ObjectId],
        ref: "User",
    },
    workoutPlans: {
        type: [mongoose_1.SchemaTypes.ObjectId],
        ref: "WorkoutPlan",
    },
}, { timestamps: true });
exports.TrainerModel = (0, mongoose_1.model)("Trainer", trainerSchema);
