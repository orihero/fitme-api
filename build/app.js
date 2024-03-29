"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var http_1 = __importDefault(require("http"));
var compression_1 = __importDefault(require("compression"));
var helmet_1 = __importDefault(require("helmet"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var passport_1 = __importDefault(require("passport"));
var express_session_1 = __importDefault(require("express-session"));
var routes_1 = __importDefault(require("./routes"));
var database_1 = __importDefault(require("./database"));
var error_1 = require("./middlewares/error");
var bootstrap_1 = __importDefault(require("./bootstrap"));
var jwt_1 = __importDefault(require("./config/jwt"));
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.app = (0, express_1.default)();
        this.database = new database_1.default();
        this.server = http_1.default.createServer(this.app);
        this.port = process.env.PORT || process.env.SERVER_PORT || "5000";
        this.start = function () { return __awaiter(_this, void 0, void 0, function () {
            var e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        (0, bootstrap_1.default)();
                        return [4 /*yield*/, this.database.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.applyMiddlewares()];
                    case 2:
                        _a.sent();
                        this.app.use("/api", routes_1.default);
                        this.app.use("/", function (r, s) {
                            s.send("YOU REACHED FITME.UZ");
                        });
                        this.app.use([error_1.notfound, error_1.generic]);
                        return [4 /*yield*/, this.server.listen(this.port, function () {
                                console.log("Server listening at port ".concat(_this.port));
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        throw Error(e_1 || "Error occurred while starting app");
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.applyMiddlewares = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.app.use([
                    (0, cors_1.default)(),
                    (0, helmet_1.default)(),
                    (0, compression_1.default)(),
                    express_1.default.json(),
                    express_1.default.urlencoded({ extended: true }),
                    express_1.default.static(path_1.default.join(__dirname, "..", "static")),
                    (0, morgan_1.default)("dev"),
                    passport_1.default.initialize(),
                    (0, express_session_1.default)({ secret: jwt_1.default.Options.secretOrKey }),
                ]);
                return [2 /*return*/];
            });
        }); };
    }
    return App;
}());
exports.default = App;
//# sourceMappingURL=app.js.map