"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = require("../../config");
const verifyJWT_Token_1 = require("../../shared/jwt/verifyJWT_Token");
const auth = (...acceptedRoles) => async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'No token !');
        }
        const verifiedUser = await (0, verifyJWT_Token_1.verifyJWT_Token)(token, config_1.JWT_SECRET_KEY);
        if (!verifiedUser) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Not authorized!');
        }
        req.user = verifiedUser;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = auth;
