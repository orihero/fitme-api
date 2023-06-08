"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DishModel = void 0;
var mongoose_1 = require("mongoose");
var dishSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    products: {
        type: [mongoose_1.SchemaTypes.ObjectId],
        ref: "Product",
    },
    amounts: {
        type: [Number],
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
exports.DishModel = (0, mongoose_1.model)("Dish", dishSchema);
//# sourceMappingURL=model.js.map