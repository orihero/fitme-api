"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CATEGORY_TYPES = exports.LEVEL = exports.GENDER = exports.ROLES = void 0;
var ROLES;
(function (ROLES) {
    ROLES["USER"] = "USER";
    ROLES["TRAINER"] = "TRAINER";
    ROLES["ADMIN"] = "ADMIN";
    ROLES["SUPERADMIN"] = "SUPERADMIN";
})(ROLES = exports.ROLES || (exports.ROLES = {}));
var GENDER;
(function (GENDER) {
    GENDER["MALE"] = "MALE";
    GENDER["FEMALE"] = "FEMALE";
    GENDER["ALL"] = "ALL";
})(GENDER = exports.GENDER || (exports.GENDER = {}));
var LEVEL;
(function (LEVEL) {
    LEVEL["NEWBIE"] = "NEWBIE";
    LEVEL["EXPERIENCED"] = "EXPERIENCED";
    LEVEL["ADVANCED"] = "ADVANCED";
})(LEVEL = exports.LEVEL || (exports.LEVEL = {}));
var CATEGORY_TYPES;
(function (CATEGORY_TYPES) {
    CATEGORY_TYPES["EXERCISE"] = "EXERCISE";
    CATEGORY_TYPES["PRODUCT"] = "PRODUCT";
})(CATEGORY_TYPES = exports.CATEGORY_TYPES || (exports.CATEGORY_TYPES = {}));
