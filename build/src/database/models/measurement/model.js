"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasurementModel = void 0;
const mongoose_1 = require("mongoose");
const measurementSchema = new mongoose_1.Schema({
    date: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: "User",
    },
    data: {
        type: [
            {
                key: String,
                value: String,
            },
        ],
    },
}, { timestamps: true });
exports.MeasurementModel = (0, mongoose_1.model)("Measurement", measurementSchema);
