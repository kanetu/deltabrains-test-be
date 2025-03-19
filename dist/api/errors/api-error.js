"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const extendable_error_1 = __importDefault(require("./extendable-error"));
/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends extendable_error_1.default {
    /**
     * Creates an API error.
     * @param {string} message - Error message.
     * @param {number} status - HTTP status code of error.
     * @param {boolean} isPublic - Whether the message should be visible to user or not.
     */
    constructor({ message, errors, stack, status = http_status_1.default.INTERNAL_SERVER_ERROR, isPublic = false, }) {
        super({
            message, errors, status, isPublic, stack,
        });
    }
}
exports.default = APIError;
