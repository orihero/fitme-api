"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
class UploadController {
    async image(req, res, next) {
        try {
            // @ts-ignore
            if (!req.files?.["image"]) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "No file selected");
            }
            res
                .status(http_status_codes_1.StatusCodes.OK)
                // @ts-ignore
                .json({ src: `/images/${req.files?.image[0].filename}` });
        }
        catch (e) {
            console.log("e!: ", e);
            next(e);
        }
    }
    async video(req, res, next) {
        try {
            // @ts-ignore
            if (!req.files?.["video"]) {
                throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "No file selected");
            }
            res
                .status(http_status_codes_1.StatusCodes.OK)
                // @ts-ignore
                .json({ src: `/videos/${req.files?.video[0].filename}` });
        }
        catch (e) {
            console.log("e!!: ", e);
            next(e);
        }
    }
}
exports.UploadController = UploadController;
