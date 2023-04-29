"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
require("reflect-metadata");
const app_1 = __importDefault(require("./src/app"));
async function bootstrap() {
    try {
        const app = new app_1.default();
        await app.start();
    }
    catch (e) {
        console.log("e: ", e);
        throw Error(e);
    }
}
bootstrap()
    .then(() => {
    console.log(`
    <.......................>
      Application Started
    <.......................>
    `);
})
    .catch((e) => {
    console.log(e);
});
