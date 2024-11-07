import * as productRepository from './product.repository';
import { CreateProductDto, UpdateProductDto, ProductResponseDto, ProductResponseNoImageDto } from './product.dto';
import { ProductAttributes } from './product.model';
import { validateSchema } from '../../utils/validation';
import { createProductSchema, updateProductSchema } from './product.validation';
import { PaginatedResult, PaginationOptions, paginateResults } from '../../utils/pagination';
import Category from '../categories/categories.model';

interface ProductWithImage extends ProductAttributes {
  image?: {
    id: number;
    filepath: string;
  } | null;
}

export const createProduct = async (productData: CreateProductDto): Promise<{ product: ProductResponseNoImageDto | null; errors?: any }> => {
  const validationResult = validateSchema(createProductSchema)(productData);

  if (!validationResult.success) {
    return { product: null, errors: validationResult.errors };
  }

  const validatedData: CreateProductDto = validationResult.data;
  const product = await productRepository.createProduct(validatedData);
  return { product };
};

export const getProductById = async (id: number): Promise<ProductResponseDto | null> => {
  const product = await productRepository.findProductById(id);
  return product ? toProductResponseDto(product) : null;
};

export const getAllProducts = async (options: PaginationOptions): Promise<PaginatedResult<ProductResponseDto>> => {
  const { rows, count } = await productRepository.findAllProducts(options);

  console.log(rows, 'rows');

  const { page = 1, limit = 10 } = options;
  return paginateResults(rows.map(toProductResponseDto), count, page, limit);
};

export const updateProduct = async (id: number, productData: UpdateProductDto): Promise<{ product: ProductResponseDto | null; errors?: any }> => {
  const validationResult = validateSchema(updateProductSchema)(productData);

  if (!validationResult.success) {
    return { product: null, errors: validationResult.errors };
  }

  if (!productData?.category_id) {
    return { product: null, errors: ['Category id is required'] };
  }

  const validatedData: UpdateProductDto = productData;
  const [, [updatedProduct]] = await productRepository.updateProduct(id, validatedData);
  return {
    product: updatedProduct ? toProductResponseDto(updatedProduct) : null,
  };
};

export const deleteProduct = async (id: number): Promise<boolean> => {
  const deletedCount = await productRepository.deleteProduct(id);
  return deletedCount > 0;
};

const toProductResponseDto = (product: ProductWithImage): ProductResponseDto => {
  const baseUrl = process.env.BASE_URL;
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    category_id: product.category_id,
    image_id: product?.image_id,
    stock: product.stock,
    image: product.image
      ? {
          id: product.image.id,
          filepath: `${baseUrl}/public${product.image.filepath}`,
        }
      : null,
  };
};
