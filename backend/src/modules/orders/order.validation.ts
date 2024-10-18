import { z } from "zod";

export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.number().int().positive(),
        quantity: z.number().int().positive(),
      }),
    )
    .nonempty("Order must contain at least one item"),
});

export const updateOrderSchema = z.object({
  status: z.enum(["pending", "completed", "cancelled"]),
});
