export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
  image_id: number;
  category_id: number;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  category_id: number;
}

export interface ProductResponseDto {
  id: number;
  name: string;
  description: string;
  image_id: number;
  price: number;
  category_id: number;
  stock: number;
  image?: { id: number; filepath: string } | null;
}

export interface ProductResponseNoImageDto {
  id: number;
  name: string;
  description: string;
  image_id: number;
  price: number;
  stock: number;
}
