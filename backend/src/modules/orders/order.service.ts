import * as orderRepository from "./order.repository";
import * as productRepository from "../products/product.repository";
import {
  CreateOrderDto,
  UpdateOrderDto,
  OrderResponseDto,
  OrderItemResponseDto,
  OrderItemDto,
} from "./order.dto";
import { OrderAttributes, OrderItemAttributes } from "./order.model";
import { validateSchema } from "../../utils/validation";
import { createOrderSchema, updateOrderSchema } from "./order.validation";
import { MESSAGES } from "../../utils/constants";
import {
  PaginatedResult,
  PaginationOptions,
  paginateResults,
} from "../../utils/pagination";

interface Error {
  message: string;
}

export const createOrder = async (
  orderData: CreateOrderDto,
): Promise<{ order: OrderResponseDto | null; errors?: any }> => {
  const validationResult = validateSchema(createOrderSchema)(orderData);
  if (!validationResult.success) {
    return { order: null, errors: validationResult.errors };
  }

  try {
    const validatedItems: OrderItemDto[] = await Promise.all(
      orderData.items.map(async (item) => {
        const product = await productRepository.findProductById(item.productId);
        if (!product) {
          throw new Error(MESSAGES.SPECIFIC_PRODUCT_NOT_FOUND(item.productId));
        }
        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for product ${product.name}`);
        }
        return item;
      }),
    );

    const total = validatedItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );

    const order = await orderRepository.createOrder({
      userId: orderData.userId,
      total,
      status: orderData.status || "pending",
      items: validatedItems,
    });

    const createdOrder = (await orderRepository.findOrderById(
      order.id,
    )) as OrderAttributes;
    return { order: toOrderResponseDto(createdOrder) };
  } catch (error) {
    const err = error as Error;
    return { order: null, errors: err.message };
  }
};

export const getOrderById = async (
  id: number,
): Promise<OrderResponseDto | null> => {
  const order = await orderRepository.findOrderById(id);
  return order ? toOrderResponseDto(order) : null;
};

export const getOrdersByUserId = async (
  userId: number,
  options: PaginationOptions,
): Promise<PaginatedResult<OrderResponseDto>> => {
  const { rows, count } = await orderRepository.findOrdersByUserId(
    userId,
    options,
  );
  const { page = 1, limit = 10 } = options;
  return paginateResults(rows.map(toOrderResponseDto), count, page, limit);
};

export const updateOrder = async (
  id: number,
  orderData: UpdateOrderDto,
): Promise<{ order: OrderResponseDto | null; errors?: any }> => {
  const validationResult = validateSchema(updateOrderSchema)(orderData);
  if (!validationResult.success) {
    return { order: null, errors: validationResult.errors };
  }

  try {
    const [, [updatedOrder]] = await orderRepository.updateOrder(id, orderData);
    return { order: updatedOrder ? toOrderResponseDto(updatedOrder) : null };
  } catch (error) {
    const err = error as Error;
    return { order: null, errors: err.message };
  }
};

const toOrderResponseDto = (order: OrderAttributes): OrderResponseDto => {
  return {
    id: order.id,
    userId: order.userId,
    total: order.total,
    status: order.status,
    items: order.OrderItems?.map(toOrderItemResponseDto) || [],
  };
};

const toOrderItemResponseDto = (
  orderItem: OrderItemAttributes,
): OrderItemResponseDto => {
  return {
    id: orderItem.id,
    productId: orderItem.productId,
    quantity: orderItem.quantity,
    price: orderItem.price,
  };
};
