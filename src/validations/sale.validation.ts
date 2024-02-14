import { z } from "zod";

export const saleValidationSchema = z.object({
  buyerName: z.string().min(3),
  contactNo: z.string().min(3),
  dateOfSale: z.date({
    required_error: "Sales Date is required.",
  }),
});
