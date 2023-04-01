import { z } from 'zod';

export const signUpSchema = z.object({
  username: z
    .string()
    .trim()
    .toLowerCase()
    .nonempty('This field is required')
    .min(3, { message: 'Username must be at least 3 characters long!' }),
  password: z
    .string()
    .trim()
    .nonempty('This field is required')
    .min(8, { message: 'Password must be at least 8 characters long!' }),
});

export const signInSchema = z.object({
  username: z.string().trim().toLowerCase().nonempty('This field is required'),
  password: z.string().trim().nonempty('This field is required'),
});

export const signUpFormSchema = signUpSchema
  .extend({
    confirmPassword: z.string().trim().nonempty('This field is required'),
  })
  .superRefine(({ password, confirmPassword }, ctx: z.RefinementCtx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: "Passwords don't match!",
      });
    }
  });
