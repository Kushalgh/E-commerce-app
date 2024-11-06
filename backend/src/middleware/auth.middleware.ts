import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { MESSAGES } from '../utils/constants';

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json(MESSAGES.NO_TOKEN_AUTH_DENIED);
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
    };
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json(MESSAGES.TOKEN_INVALID);
  }
};

export const authorizeMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json(MESSAGES.NO_TOKEN_AUTH_DENIED);
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
      role: string;
    };
    const role = decoded.role;

    console.log('Decoded Toekd: ', decoded, 'Role: ', role);
    if (role === 'admin') {
      next();
    } else {
      throw Error;
    }
  } catch (error) {
    res.status(403).json('Unauthorized to access : NOT AN ADMIN');
  }
};
