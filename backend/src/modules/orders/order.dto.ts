export interface CreateOrderDto {
  userId: number;
  total: number;
  items: OrderItemDto[];
  status?: "pending" | "completed" | "cancelled";
}

export interface OrderItemDto {
  productId: number;
  quantity: number;
  price: number;
}

export interface UpdateOrderDto {
  status?: "pending" | "completed" | "cancelled";
  total?: number;
}

export interface OrderResponseDto {
  id: number;
  userId: number;
  total: number;
  status: string;
  items: OrderItemResponseDto[];
}

export interface OrderItemResponseDto {
  id: number;
  productId: number;
  quantity: number;
  price: number;
}
