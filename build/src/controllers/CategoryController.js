"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const model_1 = require("./../database/models/category/model");
const changeResponse_1 = require("./../utils/changeResponse");
class CategoryController {
    async find(req, res, next) {
        try {
            let query = {};
            if (req.query.type) {
                query.type = req.query.type;
            }
            let result = await model_1.CategoryModel.find(query).populate([
                "parent",
                "children",
            ]);
            if (req.query.parents) {
                result = result.filter((c) => !c.parent);
            }
            if (req.query.children) {
                result = result.filter((c) => !c.children?.length);
            }
            res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, result));
        }
        catch (e) {
            console.log("e: ", e);
            next(e);
        }
    }
    async getParentCategories(req, res, next) {
        try {
            const result = await model_1.CategoryModel.find({
                parent: undefined,
                ...req.query,
            }).populate(["parent", "children"]);
            res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, result));
        }
        catch (e) {
            next(e);
        }
    }
    async create(req, res, next) {
        try {
            let parent = null;
            const { parent: _id } = req.body;
            if (_id) {
                parent = await model_1.CategoryModel.findOne({ _id });
                if (!parent) {
                    throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Parent Category not found");
                }
            }
            const saved = await model_1.CategoryModel.create({
                ...req.body,
                parent: parent?._id ?? undefined,
            });
            if (parent) {
                parent.children = [...parent.children, saved._id];
                await parent.save();
            }
            res.status(http_status_codes_1.StatusCodes.CREATED).json((0, changeResponse_1.changeResponse)(true, saved));
        }
        catch (e) {
            console.log("e: ", e);
            next(e);
        }
    }
    async findOne(req, res, next) {
        try {
            const { id: _id } = req.params;
            const found = await model_1.CategoryModel.findOne({ _id }).populate([
                "parent",
                "children",
            ]);
            if (!found) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Category not found");
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
            const updated = await model_1.CategoryModel.updateOne({ _id }, { ...req.body });
            if (!updated.modifiedCount) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Category not found");
            }
            res
                .status(http_status_codes_1.StatusCodes.OK)
                .json((0, changeResponse_1.changeResponse)(true, { ...req.body, _id }));
        }
        catch (e) {
            next(e);
        }
    }
    async updateParent(req, res, next) {
        try {
            let newParent = null;
            const { id: _id } = req.params;
            const { parent: newParentId } = req.body;
            const found = await model_1.CategoryModel.findOne({ _id }).populate("parent");
            if (!found) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Category not found");
            }
            if (found.children?.length) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "You can not change Parent Category");
            }
            const { parent } = found;
            // @ts-ignore
            if (parent && parent._id.toString() === newParentId) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Parent Category must be another Category");
            }
            if (parent) {
                // @ts-ignore
                await model_1.CategoryModel.findByIdAndUpdate(parent._id, {
                    $set: {
                        children: [
                            // @ts-ignore
                            ...parent?.children.filter((a) => a._id.toString() !== _id),
                        ],
                    },
                });
            }
            newParent = await model_1.CategoryModel.findOne({ _id: newParentId });
            if (!newParent) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Parent Category not found");
            }
            newParent.children = [...newParent.children, found._id];
            await newParent.save();
            found.parent = newParent._id;
            await found.save();
            res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, found));
        }
        catch (e) {
            next(e);
        }
    }
    async updateChildren(req, res, next) {
        try {
            const { id: _id } = req.params;
            const { children } = req.body;
            const oldChildren = [];
            const sameChildren = [];
            const newChildren = [];
            // found category
            const found = await model_1.CategoryModel.findOne({ _id }).populate([
                "parent",
                "children",
            ]);
            if (!found) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Category not found");
            }
            if (found.children) {
                for (let i = 0; i < found.children.length; i++) {
                    for (let j = 0; j < children.length; j++) {
                        if (found.children[i]._id.toString() === children[j])
                            sameChildren.push(children[j]);
                    }
                }
                for (let i = 0; i < found.children.length; i++) {
                    let isOld = true;
                    for (let j = 0; j < sameChildren.length; j++) {
                        if (found.children[i]._id.toString() === sameChildren[j]) {
                            isOld = false;
                        }
                    }
                    if (isOld) {
                        oldChildren.push(found.children[i]._id.toString());
                    }
                }
                for (let i = 0; i < children.length; i++) {
                    let isNew = true;
                    for (let j = 0; j < sameChildren.length; j++) {
                        if (children[i] === sameChildren[j]) {
                            isNew = false;
                        }
                    }
                    if (isNew) {
                        const foundNew = await model_1.CategoryModel.findById(children[i]);
                        if (foundNew) {
                            newChildren.push(children[i]);
                        }
                    }
                }
            }
            for (let i = 0; i < oldChildren.length; i++) {
                await model_1.CategoryModel.findByIdAndUpdate(oldChildren[i], {
                    $set: { parent: null },
                });
            }
            for (let i = 0; i < newChildren.length; i++) {
                await model_1.CategoryModel.findByIdAndUpdate(newChildren[i], {
                    $set: { parent: _id },
                });
            }
            // @ts-ignore
            found.children = [...sameChildren, ...newChildren];
            await found.save();
            res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, found));
        }
        catch (e) {
            next(e);
        }
    }
    async delete(req, res, next) {
        try {
            const { id: _id } = req.params;
            let found = await model_1.CategoryModel.findOne({ _id }).populate("parent");
            if (!found) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Category not found");
            }
            if (found.children?.length) {
                for (let i = 0; i < found.children.length; i++) {
                    await model_1.CategoryModel.findByIdAndUpdate(found.children[i], {
                        $set: { parent: null },
                    });
                }
            }
            if (found.parent) {
                let { parent } = found;
                // @ts-ignore
                if (parent?.children?.length) {
                    // @ts-ignore
                    await model_1.CategoryModel.findByIdAndUpdate(parent._id, {
                        $set: {
                            children: [
                                // @ts-ignore
                                ...parent.children.filter((a) => a._id.toString() !== _id),
                            ],
                        },
                    });
                }
            }
            await found.delete();
            res.status(http_status_codes_1.StatusCodes.OK).json((0, changeResponse_1.changeResponse)(true, null));
        }
        catch (e) {
            next(e);
        }
    }
}
exports.CategoryController = CategoryController;
