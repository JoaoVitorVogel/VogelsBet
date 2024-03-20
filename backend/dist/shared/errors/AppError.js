"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError {
    message;
    statusCode;
    constructor(message, statusCode) {
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.AppError = AppError;
