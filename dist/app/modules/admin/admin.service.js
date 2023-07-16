"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const admin_model_1 = require("./admin.model");
const generateJWT_Token_1 = require("../../../shared/jwt/generateJWT_Token");
const config_1 = require("../../../config");
const comparePassword_1 = require("../../../shared/utils/comparePassword");
const createAdmin = async (userInfo) => {
    const createdAdmin = await admin_model_1.Admin.create(userInfo);
    return createdAdmin;
};
const loginAdmin = async (loginInfo) => {
    const { phoneNumber, password } = loginInfo;
    const admin = new admin_model_1.Admin();
    const dbAdmin = await admin.isAdminExists(phoneNumber);
    if (!dbAdmin) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not Found !');
    }
    const savedPassword = dbAdmin === null || dbAdmin === void 0 ? void 0 : dbAdmin.password;
    const isPasswordMatch = await (0, comparePassword_1.isPasswordMatched)(password, savedPassword);
    if (!isPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Phone number or password does not match !');
    }
    //generate access token and refresh token
    const accessToken = (0, generateJWT_Token_1.generateJWT_Token)(dbAdmin, config_1.JWT_SECRET_KEY, config_1.JWT_EXPIRES_IN);
    const refreshToken = (0, generateJWT_Token_1.generateJWT_Token)(dbAdmin, config_1.JWT_SECRET_REFRESH_KEY, config_1.JWT_REFRESH_EXPIRES_IN);
    const result = {
        accessToken,
        refreshToken,
    };
    return result;
};
exports.AdminService = {
    createAdmin,
    loginAdmin,
};
