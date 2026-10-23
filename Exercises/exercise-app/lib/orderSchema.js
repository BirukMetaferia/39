import { z } from "zod";

export const orderSchema = z.object({
  name: z.string().trim().min(2, "Name must contain at least 2 characters"),
  phone: z.string().regex(
    /^(09\d{8}|\+2519\d{8})$/,
    "Use 09XXXXXXXX or +2519XXXXXXXX"
  ),
  dishId: z.string().min(1, "Dish is required"),
  quantity: z.coerce.number().int().min(1, "Quantity must be at least 1"),
});
