"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class AppDatabase {
    url = process.env.DB_URL;
    dbName = process.env.DB_NAME;
    async connect() {
        try {
            return await mongoose_1.default.connect(`${this.url}/${this.dbName}`);
        }
        catch (e) {
            throw Error("Failed to establish connection database");
        }
    }
}
exports.default = AppDatabase;
