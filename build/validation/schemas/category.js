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
exports.updateCategoryChildrenValidationSchema = exports.updateCategoryParentValidationSchema = exports.categoryValidationSchema = void 0;
var yup = __importStar(require("yup"));
var regex_1 = require("./../../constants/regex");
var common_1 = require("../../types/common");
exports.categoryValidationSchema = yup.object({
    name: yup
        .object()
        .shape({
        en: yup.string().required(),
        ru: yup.string().required(),
        uz: yup.string().required(),
    })
        .required(),
    type: yup
        .mixed()
        .oneOf([
        common_1.CATEGORY_TYPES.EXERCISE,
        common_1.CATEGORY_TYPES.PRODUCT,
        common_1.CATEGORY_TYPES.DISH,
    ])
        .required(),
    parent: yup.string().matches(regex_1.objectIdRegex).optional(),
});
exports.updateCategoryParentValidationSchema = yup.object({
    parent: yup.string().matches(regex_1.objectIdRegex).required(),
});
exports.updateCategoryChildrenValidationSchema = yup.object({
    children: yup
        .array()
        .of(yup.string().required().matches(regex_1.objectIdRegex))
        .required(),
});
//# sourceMappingURL=category.js.map