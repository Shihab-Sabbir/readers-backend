"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_service_1 = require("./user.service");
const sendResponse_1 = __importDefault(require("../../../shared/utils/sendResponse"));
const createUser = async (req, res, next) => {
    try {
        const user = req.body;
        const result = await user_service_1.UserService.createUser(user);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            data: result,
            message: 'User created successfully !',
        });
    }
    catch (error) {
        next(error);
    }
};
const getAllUsers = async (req, res, next) => {
    try {
        const result = await user_service_1.UserService.getAllUsers();
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            data: result,
            message: 'User fetched successfully !',
        });
    }
    catch (error) {
        next(error);
    }
};
const getSingleUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await user_service_1.UserService.getSingleUser(id);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            data: result,
            message: 'User fetched successfully !',
        });
    }
    catch (error) {
        next(error);
    }
};
const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const result = await user_service_1.UserService.updateUser(id, updatedData);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            data: result,
            message: 'User updated successfully !',
        });
    }
    catch (error) {
        next(error);
    }
};
const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await user_service_1.UserService.deleteUser(id);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            data: result,
            message: 'User deleted successfully !',
        });
    }
    catch (error) {
        next(error);
    }
};
const myProfile = async (req, res, next) => {
    try {
        const requestedBy = req.user;
        const result = await user_service_1.UserService.myProfile(requestedBy);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            data: result,
            message: 'User profile fetched successfully !',
        });
    }
    catch (error) {
        next(error);
    }
};
const updateProfile = async (req, res, next) => {
    try {
        const requestedBy = req.user;
        const updateData = req.body;
        const result = await user_service_1.UserService.updateProfile(requestedBy, updateData);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            data: result,
            message: 'Profile updated successfully !',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.UserController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    myProfile,
    updateProfile,
};
