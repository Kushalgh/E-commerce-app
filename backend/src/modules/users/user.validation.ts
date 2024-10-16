// import { Request, Response, NextFunction } from "express";
// import * as userService from "./user.service";
// import { registerSchema, loginSchema, updateUserSchema, userIdSchema } from "../users/user.controller";
// import { ZodError } from "zod";

// export const register = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const validatedData = registerSchema.parse(req.body);
//     const result = await userService.register(validatedData);
//     res.status(201).json(result);
//   } catch (error) {
//     if (error instanceof ZodError) {
//       res.status(400).json({ error: error.errors });
//     } else {
//       next(error);
//     }
//   }
// };

// export const login = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const validatedData = loginSchema.parse(req.body);
//     const result = await userService.login(validatedData);
//     res.json(result);
//   } catch (error) {
//     if (error instanceof ZodError) {
//       res.status(400).json({ error: error.errors });
//     } else {
//       next(error);
//     }
//   }
// };

// export const getUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const userId = userIdSchema.parse(parseInt(req.params.id));
//     const result = await userService.getUser(userId);
//     res.json(result);
//   } catch (error) {
//     if (error instanceof ZodError) {
//       res.status(400).json({ error: error.errors });
//     } else {
//       next(error);
//     }
//   }
// };

// export const getUsers = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const result = await userService.getAllUsers();
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const userId = userIdSchema.parse(parseInt(req.params.id));
//     const validatedData = updateUserSchema.parse(req.body);
//     const result = await userService.updateUser(userId, validatedData);
//     res.json(result);
//   } catch (error) {
//     if (error instanceof ZodError) {
//       res.status(400).json({ error: error.errors });
//     } else {
//       next(error);
//     }
//   }
// };

// export const deleteUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const userId = userIdSchema.parse(parseInt(req.params.id));
//     await userService.deleteUser(userId);
//     res.status(204).send();
//   } catch (error) {
//     if (error instanceof ZodError) {
//       res.status(400).json({ error: error.errors });
//     } else {
//       next(error);
//     }
//   }
// };

// export { registerSchema };
