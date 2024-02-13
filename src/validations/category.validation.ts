import { z } from "zod";

export const categoryValidationSchema = z.object({
  name: z.string().min(3),
});
