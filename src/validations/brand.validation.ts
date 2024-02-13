import { z } from "zod";

export const brandValidationSchema = z.object({
  name: z.string().min(2),
});
