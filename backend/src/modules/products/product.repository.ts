import Product, { ProductAttributes, ProductInstance } from './product.model';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { PaginationOptions, withPagination } from '../../utils/pagination';
import FileUpload from '../uploads/upload.model';

interface ProductWithImage extends ProductAttributes {
  image?: {
    id: number;
    filepath: string;
  } | null;
}

export const createProduct = async (productData: CreateProductDto): Promise<ProductAttributes> => {
  return await Product.create(productData);
};

export const findProductById = async (id: number): Promise<ProductAttributes | null> => {
  return await Product.findByPk(id);
};

export const findAllProducts = async (
  options: PaginationOptions,
): Promise<{
  rows: {
    id: number;
    name: string;
    description: string;
    image_id: number;
    price: number;
    stock: number;
    image: { id: number; filepath: string } | null;
  }[];
  count: number;
}> => {
  const products: { rows: ProductWithImage[]; count: number } = await Product.findAndCountAll({
    include: [
      {
        model: FileUpload,
        as: 'image',
        attributes: ['id', 'filepath'],
      },
    ],
    ...withPagination(options),
  });

  // Map the response to include only the required fields
  const formattedProducts = products.rows.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    image_id: product?.image_id,
    stock: product.stock,
    image: product?.image ? { id: product?.image?.id, filepath: product.image.filepath } : null,
  }));

  return {
    rows: formattedProducts,
    count: products.count,
  };
};

export const updateProduct = async (id: number, productData: UpdateProductDto): Promise<[number, ProductAttributes[]]> => {
  return await Product.update(productData, {
    where: { id },
    returning: true,
  });
};

export const deleteProduct = async (id: number): Promise<number> => {
  return await Product.destroy({ where: { id } });
};
