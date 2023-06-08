"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseModel = void 0;
var mongoose_1 = require("mongoose");
var exerciseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    metadescription: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: "Category",
        required: true,
    },
}, { timestamps: true });
exports.ExerciseModel = (0, mongoose_1.model)("Exercise", exerciseSchema);
//# sourceMappingURL=model.js.map