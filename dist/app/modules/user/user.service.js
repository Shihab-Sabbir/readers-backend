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
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = __importDefault(require("./user.model"));
const createUser = async (userInfo) => {
    const createdUser = await user_model_1.default.create(userInfo);
    return createdUser;
};
const getAllUsers = async () => {
    const users = await user_model_1.default.find();
    return users;
};
const getSingleUser = async (id) => {
    const semester = await user_model_1.default.findById(id);
    return semester;
};
const updateUser = async (id, updatedData) => {
    const updatedUser = await user_model_1.default.findOneAndUpdate({ _id: id }, updatedData, {
        new: true,
        runValidators: true,
    });
    if (!(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser._id)) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found !');
    }
    return updatedUser;
};
const deleteUser = async (id) => {
    const deletedUser = await user_model_1.default.findByIdAndDelete({
        _id: id,
    });
    return deletedUser;
};
const myProfile = async (requestedBy) => {
    var _a, _b;
    const { _id } = requestedBy;
    const user = await user_model_1.default.findById(_id);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found !');
    }
    const updatedUser = {
        phoneNumber: user === null || user === void 0 ? void 0 : user.phoneNumber,
        name: {
            firstName: (_a = user === null || user === void 0 ? void 0 : user.name) === null || _a === void 0 ? void 0 : _a.firstName,
            lastName: (_b = user === null || user === void 0 ? void 0 : user.name) === null || _b === void 0 ? void 0 : _b.lastName,
        },
    };
    return updatedUser;
};
const updateProfile = async (requestedBy, updateData) => {
    var _a, _b;
    const { _id } = requestedBy;
    const { name } = updateData, rest = __rest(updateData, ["name"]);
    const updateAdminInfo = Object.assign({}, rest);
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach((key) => {
            const nameKey = `name.${key}`;
            updateAdminInfo[nameKey] = name[key];
        });
    }
    const user = await user_model_1.default.findByIdAndUpdate(_id, updateData, {
        new: true,
        runValidators: true,
    });
    const updatedUser = {
        phoneNumber: user === null || user === void 0 ? void 0 : user.phoneNumber,
        name: {
            firstName: (_a = user === null || user === void 0 ? void 0 : user.name) === null || _a === void 0 ? void 0 : _a.firstName,
            lastName: (_b = user === null || user === void 0 ? void 0 : user.name) === null || _b === void 0 ? void 0 : _b.lastName,
        },
    };
    return updatedUser;
};
exports.UserService = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    myProfile,
    updateProfile,
};
