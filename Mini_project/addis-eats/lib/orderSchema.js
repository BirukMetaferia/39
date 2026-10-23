import { z } from "zod";

export const orderSchema = z.object({
  dishId: z.string().trim().min(1, "Please choose a dish."),
  customerName: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters.")
    .max(100, "Name must be 100 characters or fewer."),
  phone: z
    .string()
    .trim()
    .regex(
      /^\+?[0-9\s()-]{7,20}$/,
      "Enter a valid phone number."
    ),
  quantity: z.coerce
    .number()
    .int("Quantity must be a whole number.")
    .min(1, "Quantity must be at least 1.")
    .max(20, "Quantity cannot exceed 20."),
});
