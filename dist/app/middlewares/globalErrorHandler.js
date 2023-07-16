"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const handleMongooseValidationError_1 = __importDefault(require("../../errors/handleMongooseValidationError"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const zod_1 = require("zod");
const handleZodValidationError_1 = __importDefault(require("../../errors/handleZodValidationError"));
const handleCastError_1 = __importDefault(require("../../errors/handleCastError"));
const globalErrorHandler = (err, req, res, next) => {
    console.log('Global error handler ~~ ', err);
    let statusCode = 500;
    let message = 'Something went wrong';
    let errorMessages = [];
    if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        const simplifyError = (0, handleMongooseValidationError_1.default)(err);
        statusCode = simplifyError.statusCode;
        message = simplifyError.message;
        errorMessages = simplifyError.errorMessages;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        const simplifyError = (0, handleCastError_1.default)(err);
        statusCode = simplifyError.statusCode;
        message = simplifyError.message;
        errorMessages = simplifyError.errorMessages;
    }
    else if (err instanceof ApiError_1.default) {
        statusCode = err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessages = err.message
            ? [
                {
                    path: '',
                    message: err === null || err === void 0 ? void 0 : err.message,
                },
            ]
            : [];
    }
    else if (err instanceof zod_1.ZodError) {
        const simplifyError = (0, handleZodValidationError_1.default)(err);
        statusCode = simplifyError.statusCode;
        message = simplifyError.message;
        errorMessages = simplifyError.errorMessages;
    }
    else if (err instanceof Error) {
        message = err.message;
        errorMessages = (err === null || err === void 0 ? void 0 : err.message)
            ? [
                {
                    path: '',
                    message: err === null || err === void 0 ? void 0 : err.message,
                },
            ]
            : [];
    }
    // These if-else conditions and error modifications are being done only to maintain a specific error response pattern from different error types.
    res.status(statusCode).send({
        success: false,
        statusCode,
        message,
        errorMessages,
        stack: config_1.NODE_ENV !== 'production' ? err.stack : undefined,
    });
};
exports.default = globalErrorHandler;
