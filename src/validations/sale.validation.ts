import { z } from "zod";

export const saleValidationSchema = z.object({
  buyerName: z.string().min(3),
  quantity: z.coerce.number().min(1),
  dateOfSale: z.date({
    required_error: "Sales Date is required.",
  }),
});
