import {
  Order,
  OrderAttributes,
  OrderItem,
  OrderItemAttributes,
} from "./order.model";
import Product from "../products/product.model";
import { CreateOrderDto, UpdateOrderDto } from "./order.dto";
import { PaginationOptions, withPagination } from "../../utils/pagination";

export const createOrder = async (
  orderData: CreateOrderDto,
): Promise<OrderAttributes> => {
  return await Order.create(orderData);
};

export const findOrderById = async (
  id: number,
): Promise<OrderAttributes | null> => {
  return await Order.findByPk(id, {
    include: [{ model: OrderItem, include: [Product] }],
  });
};

export const findOrdersByUserId = async (
  userId: number,
  options: PaginationOptions,
): Promise<{ rows: OrderAttributes[]; count: number }> => {
  return await Order.findAndCountAll({
    where: { userId },
    include: [{ model: OrderItem, include: [Product] }],
    ...withPagination(options),
  });
};
export const updateOrder = async (
  id: number,
  orderData: UpdateOrderDto,
): Promise<[number, OrderAttributes[]]> => {
  return await Order.update(orderData, { where: { id }, returning: true });
};

export const createOrderItems = async (
  orderId: number,
  items: { productId: number; quantity: number; price: number }[],
): Promise<OrderItemAttributes[]> => {
  const orderItems = items.map((item) => ({ ...item, orderId }));
  return await OrderItem.bulkCreate(orderItems);
};
