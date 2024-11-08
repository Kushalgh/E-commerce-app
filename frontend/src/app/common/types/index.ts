import { Dispatch, SetStateAction } from "react";

export interface ProductList {
  id: number;
  name: string;
  description: string;
  price: number;
  symbol: string;
  stock: number;
  image: { id: number; filepath: string };
}

export interface CartItem {
  id: string | number;
  neQuantity: number;
}

export interface CategoryItem {
  id: string | number;
  category_name: string;
}
