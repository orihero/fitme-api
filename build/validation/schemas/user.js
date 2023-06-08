"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setWorkoutResultValidationSchema = exports.setScheduleWorkoutValidationSchema = exports.setSchemaNutritionValidationSchema = exports.setMeasurementDateValidationSchema = exports.setMeasurementValueValidationSchema = exports.removeMeasurementKeyValidationSchema = exports.addMeasurementKeyValidationSchema = exports.changeProductsValidationSchema = exports.changeFavoriteExercisesValidationSchema = exports.changeWorkoutPlansValidationSchema = exports.updateUserPhoneNumberValidationSchema = exports.updateUserNameValidationSchema = exports.createUserValidationSchema = void 0;
var yup = __importStar(require("yup"));
var regex_1 = require("./../../constants/regex");
var common_1 = require("../../types/common");
exports.createUserValidationSchema = yup.object({
    name: yup.string().required(),
    phoneNumber: yup.string().required(),
});
exports.updateUserNameValidationSchema = yup.object({
    name: yup.string().required(),
});
exports.updateUserPhoneNumberValidationSchema = yup.object({
    phoneNumber: yup.string().required(),
});
exports.changeWorkoutPlansValidationSchema = yup.object({
    planId: yup.string().matches(regex_1.objectIdRegex).required(),
});
exports.changeFavoriteExercisesValidationSchema = yup.object({
    exerciseId: yup.string().matches(regex_1.objectIdRegex).required(),
});
exports.changeProductsValidationSchema = yup.object({
    productId: yup.string().matches(regex_1.objectIdRegex).required(),
});
exports.addMeasurementKeyValidationSchema = yup.object({
    key: yup.string().required(),
});
exports.removeMeasurementKeyValidationSchema = yup.object({
    key: yup.string().required(),
});
exports.setMeasurementValueValidationSchema = yup.object({
    key: yup.string().required(),
    value: yup.string().notRequired(),
    index: yup.number().required(),
});
exports.setMeasurementDateValidationSchema = yup.object({
    index: yup.number().required(),
    date: yup
        .object()
        .shape({
        year: yup.number().min(2000).max(2050).required(),
        month: yup.number().min(1).max(12).required(),
        day: yup.number().min(1).max(31).required(),
    })
        .required(),
});
exports.setSchemaNutritionValidationSchema = yup.object({
    date: yup
        .object()
        .shape({
        year: yup.number().min(2000).max(2050).required(),
        month: yup.number().min(1).max(12).required(),
        day: yup.number().min(1).max(31).required(),
    })
        .required(),
    data: yup.object().shape({
        nType: yup
            .mixed()
            .oneOf([common_1.NUTRITION_TYPE.FAT, common_1.NUTRITION_TYPE.THIN])
            .required(),
        dailyNorm: yup.number().required(),
        amount: yup.number().required(),
        proteinPercent: yup.number().required(),
        oilPercent: yup.number().required(),
        mergeAmount: yup.number().required(),
        mergeCarb: yup.number().required(),
    }),
    products: yup.array().of(yup.string().matches(regex_1.objectIdRegex)).required(),
    amountsP: yup.array().of(yup.number()).required(),
    dishes: yup.array().of(yup.string().matches(regex_1.objectIdRegex)).required(),
    amountsD: yup.array().of(yup.number()).required(),
});
exports.setScheduleWorkoutValidationSchema = yup.object({
    planId: yup.string().matches(regex_1.objectIdRegex).required(),
});
exports.setWorkoutResultValidationSchema = yup.object({
    group: yup.number().required(),
    week: yup.number().required(),
    workout: yup.number().required(),
    approach: yup.number().required(),
    weight: yup.number().required(),
    repeat: yup.number().required(),
});
//# sourceMappingURL=user.js.map