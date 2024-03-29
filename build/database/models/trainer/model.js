"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainerModel = void 0;
var mongoose_1 = require("mongoose");
var common_1 = require("./../../../types/common");
var trainerSchema = new mongoose_1.Schema({
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
    experience: {
        type: Number,
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
        default: null
    },
    disciples: {
        type: [mongoose_1.SchemaTypes.ObjectId],
        ref: "User",
        default: null
    },
    workoutPlans: {
        type: [mongoose_1.SchemaTypes.ObjectId],
        ref: "WorkoutPlan",
        default: null
    },
    products: {
        type: [mongoose_1.SchemaTypes.ObjectId],
        ref: "Product",
        default: null
    },
    dishes: {
        type: [mongoose_1.SchemaTypes.ObjectId],
        ref: "Dish",
        default: null
    },
    nutritionPlans: {
        type: [mongoose_1.SchemaTypes.ObjectId],
        ref: "NutritionPlan",
        default: null
    },
}, { timestamps: true });
exports.TrainerModel = (0, mongoose_1.model)("Trainer", trainerSchema);
//# sourceMappingURL=model.js.map