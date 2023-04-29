"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailRegex = exports.objectIdRegex = void 0;
exports.objectIdRegex = /^[0-9a-fA-F]{24}$/;
exports.emailRegex = /^(?!.*@[^,]*,)/;
