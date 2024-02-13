import { operatingSystems, powerSources } from "@/constants/product.constant";
import { z } from "zod";

export const productValidationSchema = z.object({
  name: z.string().min(3),
  model: z.string().min(3),
  quantity: z.coerce.number().min(1),
  cost: z.coerce.number().min(0),
  price: z.coerce.number().min(0),
  imgUrl: z.string().url().optional(),
  description: z.string().min(3),
  brand: z.string(),
  category: z.string(),
  releaseDate: z.date({ required_error: "release date is required" }),
  operatingSystem: z
    .enum([...operatingSystems] as [string, ...string[]])
    .optional(),
  weight: z.coerce.number().min(0).optional(),
  powerSource: z.enum([...powerSources] as [string, ...string[]]).optional(),
  camera: z.coerce.number().min(1).optional(),
  displaySize: z.coerce.number().min(0.5).optional(),
});
