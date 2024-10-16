import { Request, Response, NextFunction } from "express";
import { MESSAGES } from "../utils/constants";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.error(err.stack);
  res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR);
};
