"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const config_1 = require("../../../config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const AdminSchema = new mongoose_1.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['admin'],
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    name: {
        type: {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
        },
        required: true,
        _id: false,
    },
    address: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
AdminSchema.methods.isAdminExists = async function (phoneNumber) {
    const isAdminExist = exports.Admin.findOne({ phoneNumber: phoneNumber }, {
        phoneNumber: 1,
        password: 1,
        role: 1,
    }).lean();
    return isAdminExist;
};
AdminSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt_1.default.hash(user.password, Number(config_1.BCRYPT_SALT_ROUNDS));
    next();
});
AdminSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    },
});
exports.Admin = (0, mongoose_1.model)('Admin', AdminSchema);
