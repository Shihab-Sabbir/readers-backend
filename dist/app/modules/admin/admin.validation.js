"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdminZodSchema = void 0;
const zod_1 = require("zod");
exports.createAdminZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        role: zod_1.z.enum(['admin'], {
            required_error: '',
        }),
        name: zod_1.z
            .object({
            firstName: zod_1.z.string({
                required_error: '',
            }),
            lastName: zod_1.z.string({
                required_error: '',
            }),
        })
            .strict(),
        phoneNumber: zod_1.z.string({
            required_error: '',
        }),
        password: zod_1.z.string({
            required_error: '',
        }),
        address: zod_1.z.string({
            required_error: '',
        }),
    })
        .strict(),
});
