import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  price: z.number().positive("Price must be a positive number"),
  stock: z
    .number()
    .int("Stock must be an integer")
    .nonnegative("Stock must be non-negative"),
});

export const updateProductSchema = createProductSchema.partial();
