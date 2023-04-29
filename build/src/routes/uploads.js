"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const UploadController_1 = require("./../controllers/UploadController");
const router = (0, express_1.Router)();
const controller = new UploadController_1.UploadController();
const multer = require("multer");
const imageStorage = multer.diskStorage({
    // @ts-ignore
    destination: function (req, file, cb) {
        cb(null, "static/images/");
    },
    // @ts-ignore
    filename: function (req, file, cb) {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    },
});
const uploadImagee = multer({ storage: imageStorage });
const uploadImage = uploadImagee.fields([{ name: "image", maxCount: 1 }]);
const videoStorage = multer.diskStorage({
    // @ts-ignore
    destination: function (req, file, cb) {
        cb(null, "static/videos/");
    },
    // @ts-ignore
    filename: function (req, file, cb) {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    },
});
const uploadVideoo = multer({ storage: videoStorage });
const uploadVideo = uploadVideoo.fields([{ name: "video", maxCount: 1 }]);
router.post("/image", uploadImage, controller.image);
router.post("/video", uploadVideo, controller.video);
exports.default = router;
