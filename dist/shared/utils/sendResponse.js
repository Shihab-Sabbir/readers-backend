"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, result) => {
    const { success, message = null, meta = null, data = null, statusCode, } = result;
    const response = {
        success: success,
        statusCode: statusCode,
        message: message,
    };
    if (meta !== null) {
        response.meta = meta;
    }
    if (data !== null) {
        response.data = data;
    }
    res.status(statusCode).send(response);
};
exports.default = sendResponse;
