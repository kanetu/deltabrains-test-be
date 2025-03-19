"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logs = exports.mongo = exports.port = exports.env = void 0;
const path_1 = __importDefault(require("path"));
// import .env variables
const dotenv_safe_1 = __importDefault(require("dotenv-safe"));
dotenv_safe_1.default.config({
    path: path_1.default.join(__dirname, '../../.env'),
    example: path_1.default.join(__dirname, '../../.env.example'),
});
const env = process.env.NODE_ENV;
exports.env = env;
const port = process.env.PORT;
exports.port = port;
const mongo = {
    uri: process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TESTS : process.env.MONGO_URI,
};
exports.mongo = mongo;
const logs = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
exports.logs = logs;
