"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const admin_service_1 = require("./admin.service");
const sendResponse_1 = __importDefault(require("../../../shared/utils/sendResponse"));
const config_1 = require("../../../config");
const createAdmin = async (req, res, next) => {
    try {
        const info = req.body;
        const result = await admin_service_1.AdminService.createAdmin(info);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            data: result,
            message: 'Admin created successfully !',
        });
    }
    catch (error) {
        next(error);
    }
};
const loginAdmin = async (req, res, next) => {
    try {
        const payload = req.body;
        const result = await admin_service_1.AdminService.loginAdmin(payload);
        const { refreshToken } = result, rest = __rest(result, ["refreshToken"]); // not sent refresh token to frontend
        // set response token to cookie
        const cookieOptions = {
            secure: config_1.NODE_ENV === 'production',
            httpOnly: true,
        };
        res.cookie('refreshToken', refreshToken, cookieOptions);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            data: rest,
            message: 'Login successfully !',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.AdminController = {
    createAdmin,
    loginAdmin
};
