import { z } from 'zod';

export const signUpSchema = z.object({
  username: z
    .string()
    .trim()
    .toLowerCase()
    .nonempty('This field is required')
    .min(3, { message: 'Username must be at least 3 characters long!' })
    .transform((value) => value.replace(/\s+/g, '')),
  password: z
    .string()
    .trim()
    .nonempty('This field is required')
    .min(8, { message: 'Password must be at least 8 characters long!' }),
});

export const signInSchema = z.object({
  username: z.string().trim().nonempty('This field is required'),
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

export const postSchema = z.object({
  content: z
    .string()
    .trim()
    .nonempty('Content cannot be empty.')
    .max(400, 'Content can be maximum of 400 characters long.'),
});

export const searchSchema = z.object({
  q: z.string().trim().nonempty('This field is required'),
});
