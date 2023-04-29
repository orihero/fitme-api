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
exports.discipleValidationSchema = exports.trainerValidationSchema = void 0;
const yup = __importStar(require("yup"));
const common_1 = require("./../../types/common");
const regex_1 = require("./../../constants/regex");
exports.trainerValidationSchema = yup.object({
    name: yup.string().required(),
    phoneNumber: yup.string().required(),
    gender: yup
        .mixed()
        .oneOf([common_1.GENDER.MALE, common_1.GENDER.FEMALE, common_1.GENDER.ALL])
        .required(),
    age: yup.number().required(),
    email: yup.string().email().matches(regex_1.emailRegex).required(),
    city: yup.string().required(),
    avatar: yup.string().required(),
    speciality: yup.string().required(),
    education: yup.string().required(),
    aboutMe: yup.string().required(),
    telegramLink: yup.string().required(),
    instagramLink: yup.string().required(),
});
exports.discipleValidationSchema = yup.object({
    discipleId: yup.string().matches(regex_1.objectIdRegex).required(),
});
