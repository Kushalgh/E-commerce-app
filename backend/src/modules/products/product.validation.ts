import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  price: z.number().positive('Price must be a positive number'),
  stock: z.number().int('Stock must be an integer').nonnegative('Stock must be non-negative'),
  image_id: z.number({ required_error: 'ImageId is required', invalid_type_error: 'Id must be an integer' }),
  category_id: z.number({ required_error: 'Category Id is required', invalid_type_error: 'Id must be an integer' }),
});

export const updateProductSchema = createProductSchema.partial();
