"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPasswordMatched = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const isPasswordMatched = async function (givenPassword, DbPassword) {
    try {
        console.log({ givenPassword, DbPassword });
        const isPasswordMatch = await bcrypt_1.default.compare(givenPassword, DbPassword);
        return isPasswordMatch;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.isPasswordMatched = isPasswordMatched;
