import Product, { ProductAttributes } from "./product.model";
import { CreateProductDto, UpdateProductDto } from "./product.dto";
import { PaginationOptions, withPagination } from "../../utils/pagination";

export const createProduct = async (
  productData: CreateProductDto,
): Promise<ProductAttributes> => {
  return await Product.create(productData);
};

export const findProductById = async (
  id: number,
): Promise<ProductAttributes | null> => {
  return await Product.findByPk(id);
};

export const findAllProducts = async (
  options: PaginationOptions,
): Promise<{ rows: ProductAttributes[]; count: number }> => {
  return await Product.findAndCountAll({
    ...withPagination(options),
  });
};

export const updateProduct = async (
  id: number,
  productData: UpdateProductDto,
): Promise<[number, ProductAttributes[]]> => {
  return await Product.update(productData, { where: { id }, returning: true });
};

export const deleteProduct = async (id: number): Promise<number> => {
  return await Product.destroy({ where: { id } });
};
