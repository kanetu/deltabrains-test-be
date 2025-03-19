"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.converter = exports.handler = void 0;
const http_status_1 = __importDefault(require("http-status"));
const api_error_1 = __importDefault(require("../errors/api-error"));
const vars_1 = require("../../config/vars");
/**
 * Error handler. Send stacktrace only during development
 * @public
 */
const handler = (err, req, res, next) => {
    const response = {
        code: err.status,
        message: err.message,
        errors: err.errors,
        stack: err.stack,
    };
    if (vars_1.env !== 'development') {
        delete response.stack;
    }
    res.status(err.status);
    res.json(response);
};
exports.handler = handler;
/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
const converter = (err, req, res, next) => {
    let convertedError = err;
    if (!(err instanceof api_error_1.default)) {
        convertedError = new api_error_1.default({
            message: err.message,
            status: err.status,
            stack: err.stack,
        });
    }
    return (0, exports.handler)(convertedError, req, res, next);
};
exports.converter = converter;
/**
 * Catch 404 and forward to error handler
 * @public
 */
const notFound = (req, res, next) => {
    const err = new api_error_1.default({
        message: 'Not found',
        status: http_status_1.default.NOT_FOUND,
    });
    return (0, exports.handler)(err, req, res, next);
};
exports.notFound = notFound;
