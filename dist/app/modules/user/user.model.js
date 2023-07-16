"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const config_1 = require("../../../config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: 0,
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
}, { timestamps: true });
userSchema.methods.isUserExists = async function (phoneNumber) {
    const isUserExist = User.findOne({ phoneNumber: phoneNumber }, {
        phoneNumber: 1,
        password: 1,
    }).lean();
    return isUserExist;
};
userSchema.methods.isPasswordMatched = async function (givenPassword, DbPassword) {
    const isPasswordMatch = await bcrypt_1.default.compare(givenPassword, DbPassword);
    return isPasswordMatch;
};
userSchema.pre('save', async function (next) {
    //hash password just before save in DB
    const user = this;
    user.password = await bcrypt_1.default.hash(user.password, Number(config_1.BCRYPT_SALT_ROUNDS));
    next();
});
userSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    },
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
