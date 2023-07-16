"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const config_1 = require("../../../config");
const generateJWT_Token_1 = require("../../../shared/jwt/generateJWT_Token");
const verifyJWT_Token_1 = require("../../../shared/jwt/verifyJWT_Token");
const loginUser = async (loginInfo) => {
    const { phoneNumber, password } = loginInfo;
    const user = new user_model_1.default(); // create instance of User
    const dbUser = await user.isUserExists(phoneNumber);
    if (!dbUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not Found !');
    }
    const savedPassword = dbUser === null || dbUser === void 0 ? void 0 : dbUser.password;
    const isPasswordMatch = await user.isPasswordMatched(password, savedPassword);
    if (!isPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Phone number or password does not match !');
    }
    //generate access token and refresh token
    const accessToken = (0, generateJWT_Token_1.generateJWT_Token)(dbUser, config_1.JWT_SECRET_KEY, config_1.JWT_EXPIRES_IN);
    const refreshToken = (0, generateJWT_Token_1.generateJWT_Token)(dbUser, config_1.JWT_SECRET_REFRESH_KEY, config_1.JWT_REFRESH_EXPIRES_IN);
    const result = {
        accessToken,
        refreshToken,
        phoneNumber,
    };
    return result;
};
const UserRefreshToken = async (refreshToken) => {
    if (!refreshToken) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'No refresh token available');
    }
    const verifiedRefreshToken = (await (0, verifyJWT_Token_1.verifyJWT_Token)(refreshToken, config_1.JWT_SECRET_REFRESH_KEY)) ||
        null;
    if (!verifiedRefreshToken) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid refresh token!');
    }
    const { id } = verifiedRefreshToken;
    // Check if the user is deleted/blocked or not in the database
    const dbUser = await user_model_1.default.findOne({ id });
    if (!dbUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist!');
    }
    // Generate a new token
    const newAccessToken = (0, generateJWT_Token_1.generateJWT_Token)(dbUser, config_1.JWT_SECRET_KEY, config_1.JWT_EXPIRES_IN);
    const result = {
        accessToken: newAccessToken,
    };
    return result;
};
exports.AuthService = {
    loginUser,
    UserRefreshToken,
};
