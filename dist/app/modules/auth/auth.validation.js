"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenZodSchema = exports.loginZodSchema = void 0;
const zod_1 = require("zod");
exports.loginZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        phoneNumber: zod_1.z.string({
            required_error: 'Phone number is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    })
        .strict(),
});
exports.refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z
        .object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh token is required !',
        }),
    })
        .strict(),
});
