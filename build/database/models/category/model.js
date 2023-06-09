"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
var common_1 = require("./../../../types/common");
var mongoose_1 = require("mongoose");
var categorySchema = new mongoose_1.Schema({
    name: {
        en: String,
        ru: String,
        uz: String,
    },
    type: {
        type: String,
        enum: [
            common_1.CATEGORY_TYPES.EXERCISE,
            common_1.CATEGORY_TYPES.PRODUCT,
            common_1.CATEGORY_TYPES.DISH,
        ],
        default: common_1.CATEGORY_TYPES.EXERCISE,
    },
    parent: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: "Category",
        required: false,
    },
    children: {
        type: [mongoose_1.SchemaTypes.ObjectId],
        ref: "Category",
    },
}, { timestamps: true });
exports.CategoryModel = (0, mongoose_1.model)("Category", categorySchema);
//# sourceMappingURL=model.js.map