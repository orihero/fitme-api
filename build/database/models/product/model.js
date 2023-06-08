"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
var mongoose_1 = require("mongoose");
var productSchema = new mongoose_1.Schema({
    name: {
        en: {
            type: String,
            required: true,
            unique: true,
        },
        ru: {
            type: String,
            required: true,
            unique: true,
        },
        uz: {
            type: String,
            required: true,
            unique: true,
        },
    },
    calories: {
        type: Number,
        required: true,
    },
    protein: {
        type: Number,
        required: true,
    },
    oil: {
        type: Number,
        required: true,
    },
    carb: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: "Category",
    },
    creatorTrainer: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: "Trainer",
    },
    creatorUser: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: "User",
    },
}, { timestamps: true });
exports.ProductModel = (0, mongoose_1.model)("Product", productSchema);
//# sourceMappingURL=model.js.map