import { Request, Response, NextFunction } from "express";
import * as userService from "./user.service";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await userService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await userService.login(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await userService.getUser(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await userService.getAllUsers();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await userService.updateUser(
      parseInt(req.params.id),
      req.body,
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await userService.deleteUser(parseInt(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
