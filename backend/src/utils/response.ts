import { Response } from "express";
import { MESSAGES } from "./constants";


// Success response
export const successResponse = <T>(
  res: Response,
  message: string,
  data?: T,
) => {
  return res.status(200).json({
    success: true,
    message: message || MESSAGES.REQUEST_SUCCESS,
    data,
  });
};

//Error response
export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string = MESSAGES.REQUEST_ERROR,
  errors?: any[],
): void => {
  res.status(statusCode).json({
    success: false,
    message,
    errors: errors || [],
  });
};

export const paginationSuccessResponse = <T>(
  res: Response,
  data: T[],
  totalItems: number,
  currentPage: number,
  totalPages: number,
  message?: string,
) => {
  return res.status(200).json({
    success: true,
    message: message || "Data retrieved successfully.",
    data,
    pagination: {
      totalItems,
      currentPage,
      totalPages,
    },
  });
};
