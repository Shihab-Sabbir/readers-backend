"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT_Token = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const verifyJWT_Token = async (token, key) => {
    try {
        return jsonwebtoken_1.default.verify(token, key);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, error);
    }
};
exports.verifyJWT_Token = verifyJWT_Token;
