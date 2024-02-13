import z from "zod";

export const loginValidationSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(4),
});

export const signupValidationSchema = z.object({
  name: z.string().min(3).trim(),
  email: z.string().email().trim(),
  password: z.string().min(4),
});
