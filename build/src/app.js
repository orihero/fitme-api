"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const database_1 = __importDefault(require("./database"));
const error_1 = require("./middlewares/error");
class App {
    app = (0, express_1.default)();
    database = new database_1.default();
    server = http_1.default.createServer(this.app);
    port = process.env.PORT || process.env.SERVER_PORT;
    start = async () => {
        try {
            await this.database.connect();
            await this.applyMiddlewares();
            this.app.use("/api", routes_1.default);
            this.app.use([error_1.notfound, error_1.generic]);
            await this.server.listen(this.port, () => {
                console.log(`Server listening at port ${this.port}`);
            });
        }
        catch (e) {
            throw Error(e || "Error occurred while starting app");
        }
    };
    applyMiddlewares = async () => {
        this.app.use([
            (0, cors_1.default)(),
            (0, helmet_1.default)(),
            (0, compression_1.default)(),
            express_1.default.json(),
            express_1.default.urlencoded({ extended: true }),
            express_1.default.static(path_1.default.join(__dirname, "..", "static")),
            (0, morgan_1.default)("dev"),
        ]);
    };
}
exports.default = App;
