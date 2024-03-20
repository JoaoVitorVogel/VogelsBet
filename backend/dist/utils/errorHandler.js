"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = require("../shared/errors/AppError");
function errorHandler(err, _request, response, _next) {
    if (err instanceof AppError_1.AppError) {
        return response.status(err.statusCode).json({
            message: err.message,
        });
    }
    // Existem mais tipos de erro se quisermos...
    return response.status(500).json({
        status: "Error",
        message: `Internal Server Error, error: ${err}`,
    });
}
exports.errorHandler = errorHandler;
