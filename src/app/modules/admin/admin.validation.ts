import { z } from 'zod';

export const createAdminZodSchema = z.object({
  body: z
    .object({
      role: z.enum(['admin'], {
        required_error: '',
      }),
      name: z
        .object({
          firstName: z.string({
            required_error: '',
          }),
          lastName: z.string({
            required_error: '',
          }),
        })
        .strict(),
      phoneNumber: z.string({
        required_error: '',
      }),
      password: z.string({
        required_error: '',
      }),
      address: z.string({
        required_error: '',
      }),
    })
    .strict(),
});
