"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseController = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const exercise_1 = require("../database/models/exercise");
const model_1 = require("./../database/models/category/model");
const changeResponse_1 = require("./../utils/changeResponse");
class ExerciseController {
    async find(req, res, next) {
        let query = {};
        if (req.query.category) {
            query.category = req.query.category;
        }
        try {
            const result = await exercise_1.ExerciseModel.find(query).populate("category");
            res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, result));
        }
        catch (e) {
            console.log("e: ", e);
            next(e);
        }
    }
    async create(req, res, next) {
        try {
            const { title, video, image, description, metadescription } = req.body;
            const found = await exercise_1.ExerciseModel.findOne({ title });
            if (found) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, `${req.body.title} is already created`);
            }
            const category = await model_1.CategoryModel.findById(req.body.category).populate("parent");
            if (!category) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Category not found");
            }
            // @ts-ignore
            if (!category.parent) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid Category");
            }
            const saved = await exercise_1.ExerciseModel.create({
                title,
                video,
                image,
                description,
                metadescription,
                category,
            });
            res.status(http_status_codes_1.StatusCodes.CREATED).json((0, changeResponse_1.changeResponse)(true, saved));
        }
        catch (e) {
            next(e);
        }
    }
    async findOne(req, res, next) {
        try {
            const found = await exercise_1.ExerciseModel.findById(req.params.id).populate("category");
            if (!found) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Exercise not found");
            }
            res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, found));
        }
        catch (e) {
            next(e);
        }
    }
    async update(req, res, next) {
        try {
            const { id: _id } = req.params;
            const { title, video, image, description, metadescription } = req.body;
            const updated = await exercise_1.ExerciseModel.updateOne({ _id }, { title, video, image, description, metadescription });
            if (!updated.modifiedCount) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Exercise not found");
            }
            res
                .status(http_status_codes_1.StatusCodes.OK)
                .json((0, changeResponse_1.changeResponse)(true, { ...req.body, _id }));
        }
        catch (e) {
            next(e);
        }
    }
    async updateCategory(req, res, next) {
        try {
            const category = await model_1.CategoryModel.findById(req.body.category).populate("parent");
            if (!category) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Category not found");
            }
            // @ts-ignore
            if (!category.parent) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid Category");
            }
            const exercise = await exercise_1.ExerciseModel.findById(req.params.id).populate("category");
            if (!exercise) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Exercise not found");
            }
            if (exercise?.category._id.toString() === category._id.toString()) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Category must be another Category");
            }
            exercise.category = category;
            await exercise.save();
            res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, exercise));
        }
        catch (e) {
            next(e);
        }
    }
    async delete(req, res, next) {
        try {
            const { id: _id } = req.params;
            const deleted = await exercise_1.ExerciseModel.deleteOne({ _id });
            if (!deleted.deletedCount) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Exercise not found");
            }
            res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, null));
        }
        catch (e) {
            next(e);
        }
    }
}
exports.ExerciseController = ExerciseController;
