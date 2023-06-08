"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var path_1 = __importDefault(require("path"));
var controllers_1 = require("./../controllers");
var router = (0, express_1.Router)();
var controller = new controllers_1.UploadController();
var multer = require("multer");
var imageStorage = multer.diskStorage({
    // @ts-ignore
    destination: function (req, file, cb) {
        cb(null, "static/images/");
    },
    // @ts-ignore
    filename: function (req, file, cb) {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    },
});
var uploadImagee = multer({ storage: imageStorage });
var uploadImage = uploadImagee.fields([{ name: "image", maxCount: 1 }]);
var videoStorage = multer.diskStorage({
    // @ts-ignore
    destination: function (req, file, cb) {
        cb(null, "static/videos/");
    },
    // @ts-ignore
    filename: function (req, file, cb) {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    },
});
var uploadVideoo = multer({ storage: videoStorage });
var uploadVideo = uploadVideoo.fields([{ name: "video", maxCount: 1 }]);
router.post("/image", uploadImage, controller.image);
router.post("/video", uploadVideo, controller.video);
exports.default = router;
//# sourceMappingURL=uploads.js.map