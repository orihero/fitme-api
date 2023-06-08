"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NutritionPlanModel = void 0;
var mongoose_1 = require("mongoose");
var common_1 = require("../../../types/common");
var nutritionPlanSchema = new mongoose_1.Schema({
    creatorName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
    oilPercent: {
        type: Number,
        required: true,
    },
    proteinPercent: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: [common_1.NUTRITION_TYPE.FAT, common_1.NUTRITION_TYPE.THIN],
        default: common_1.NUTRITION_TYPE.FAT,
    },
    creatorUser: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: "User",
        required: false,
    },
    creatorTrainer: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: "Trainer",
        required: false,
    },
    nutritions: {
        type: [
            [
                {
                    products: {
                        type: [mongoose_1.SchemaTypes.ObjectId],
                        ref: "Product",
                    },
                    amountsP: [Number],
                    dishes: {
                        type: [mongoose_1.SchemaTypes.ObjectId],
                        ref: "Dish",
                    },
                    amountsD: [Number],
                    recommendation: {
                        type: String,
                        required: true,
                    },
                },
            ],
        ],
    },
}, {
    timestamps: true,
});
exports.NutritionPlanModel = (0, mongoose_1.model)("NutritionPlan", nutritionPlanSchema);
//# sourceMappingURL=model.js.map