import { NextFunction, Request, Response } from "express";
import * as orderService from "./order.service";
import {
  errorResponse,
  paginationSuccessResponse,
  successResponse,
} from "../../utils/response";
import { MESSAGES } from "../../utils/constants";
import { CreateOrderDto, UpdateOrderDto } from "./order.dto";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const orderData: CreateOrderDto = {
      ...req.body,
      userId: req.userId!,
    };

    const { order, errors } = await orderService.createOrder(orderData);

    if (errors) {
      errorResponse(res, 400, MESSAGES.VALIDATION_FAILED, errors);
    } else if (order) {
      successResponse(res, MESSAGES.ORDER_CREATED_SUCCESS, order);
    } else {
      errorResponse(res, 400, MESSAGES.FAILED_TO_CREATE_ORDER);
    }
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const orderId = parseInt(req.params.id);
    const order = await orderService.getOrderById(orderId);

    if (order) {
      successResponse(res, MESSAGES.ORDER_FETCH_SUCCESS, order);
    } else {
      errorResponse(res, 404, MESSAGES.ORDER_NOT_FOUND);
    }
  } catch (error) {
    next(error);
  }
};

export const getUserOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.userId!;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const paginatedOrders = await orderService.getOrdersByUserId(userId, {
      page,
      limit,
    });
    paginationSuccessResponse(
      res,
      paginatedOrders.data,
      paginatedOrders.totalItems,
      paginatedOrders.currentPage,
      paginatedOrders.totalPages,
      MESSAGES.ORDER_FETCH_SUCCESS,
    );
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const orderId = parseInt(req.params.id);
    const orderData: UpdateOrderDto = req.body;
    const { order, errors } = await orderService.updateOrder(
      orderId,
      orderData,
    );

    if (errors) {
      errorResponse(res, 400, MESSAGES.VALIDATION_FAILED, errors);
    } else if (order) {
      successResponse(res, MESSAGES.ORDER_UPDATED_SUCCESS, order);
    } else {
      errorResponse(res, 404, MESSAGES.ORDER_NOT_FOUND);
    }
  } catch (error) {
    next(error);
  }
};
