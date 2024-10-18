import { Request, Response, NextFunction } from "express";
import * as productService from "../modules/products/product.service";
import { CreateProductDto } from "../modules/products/product.dto";
import { successResponse, errorResponse } from "../utils/response";
import { z } from "zod";
import { MESSAGES } from "../utils/constants";

const createProductSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  price: z.number().positive({ message: "Price must be a positive number." }),
  stock: z
    .number()
    .int()
    .nonnegative({ message: "Stock must be a non-negative integer." }),
});

type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: z.ZodError["errors"] };

export const validateSchema = <T>(schema: z.Schema<T>) => {
  return (data: unknown): ValidationResult<T> => {
    try {
      const validatedData = schema.parse(data);
      return { success: true, data: validatedData };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, errors: error.errors };
      }
      throw error;
    }
  };
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validationResult = validateSchema(createProductSchema)(req.body);

    if (!validationResult.success) {
      return errorResponse(
        res,
        422,
        MESSAGES.VALIDATION_FAILED,
        validationResult.errors,
      );
    }

    const productData: CreateProductDto = validationResult.data; // Safe to access data

    const product = await productService.createProduct(productData);
    successResponse(res, MESSAGES.PRODUCT_CREATED_SUCCESS, product);
  } catch (error) {
    next(error);
  }
};
