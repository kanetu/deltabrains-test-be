"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const v1_1 = __importDefault(require("../api/routes/v1"));
const vars_1 = require("./vars");
const error = require('../api/middlewares/error');
const app = (0, express_1.default)();
// request logging. dev: console | production: file
app.use((0, morgan_1.default)(vars_1.logs));
// gzip compression
app.use((0, compression_1.default)());
// secure apps by setting various HTTP headers
app.use((0, helmet_1.default)());
// enable CORS - Cross Origin Resource Sharing
app.use((0, cors_1.default)());
// mount api v1 routes
app.use('/v1', v1_1.default);
// if error is not an instanceOf APIError, convert it.
app.use(error.converter);
// catch 404 and forward to error handler
app.use(error.notFound);
// error handler, send stacktrace only during development
app.use(error.handler);
module.exports = app;
