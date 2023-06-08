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
exports.createNutritionPlanValidationSchema = void 0;
var yup = __importStar(require("yup"));
var common_1 = require("../../types/common");
var regex_1 = require("../../constants/regex");
exports.createNutritionPlanValidationSchema = yup.object({
    creatorName: yup.string().required(),
    title: yup.string().required(),
    description: yup.string().required(),
    calories: yup.number().required(),
    proteinPercent: yup.number().required(),
    oilPercent: yup.number().required(),
    type: yup.mixed().oneOf([common_1.NUTRITION_TYPE.FAT, common_1.NUTRITION_TYPE.THIN]).required(),
    creator: yup.string().matches(regex_1.objectIdRegex).required(),
    nutritions: yup
        .array()
        .of(yup
        .array()
        .of(yup.object().shape({
        products: yup
            .array()
            .of(yup.string().matches(regex_1.objectIdRegex))
            .required(),
        amountsP: yup.array().of(yup.number()).required(),
        dishes: yup
            .array()
            .of(yup.string().matches(regex_1.objectIdRegex))
            .required(),
        amountsD: yup.array().of(yup.number()).required(),
        recommendation: yup.string().required().required(),
    }))
        .required())
        .required(),
});
//# sourceMappingURL=nutrition.js.map