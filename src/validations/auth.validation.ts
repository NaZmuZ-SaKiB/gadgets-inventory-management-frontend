import { USER_ROLE } from "@/constants/user.constant";
import z from "zod";

export const loginValidationSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(4),
});

export const signupValidationSchema = z.object({
  name: z.string().min(3).trim(),
  email: z.string().email().trim(),
  password: z.string().min(4),
  role: z
    .enum([...(Object.values(USER_ROLE) as [string, ...string[]])])
    .default(USER_ROLE.USER),
});

export const updateProfileValidationSchema = z.object({
  name: z.string().min(3).trim().optional(),
  email: z.string().email().trim().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.enum(["male", "female"]).optional(),
  phone: z.string().max(11, "max phone length is 11").optional(),
  permanentAddress: z.string().optional(),
  presentAddress: z.string().optional(),
  emergencyContact: z
    .object({
      name: z.string().optional(),
      phone: z.string().max(11, "max phone length is 11").optional(),
      relationShip: z.string().optional(),
      occupation: z.string().optional(),
    })
    .optional(),
  employmentStatus: z.enum(["full-time", "part-time"]).optional(),
  workLocation: z.enum(["on-site", "remote"]).optional(),
  employeeType: z.enum(["permanent", "temporary", "intern"]).optional(),
  salary: z.coerce.number().optional(),
  joiningDate: z.string().optional(),
  image: z.string().optional(),
});
