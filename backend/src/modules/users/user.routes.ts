import express from 'express';
import * as userController from './user.controller';
import { authMiddleware, authorizeMiddleware } from '../../middleware/auth.middleware';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/:id', authMiddleware, userController.getUser);
router.get('/', authMiddleware, authorizeMiddleware, userController.getUsers);
router.put('/:id', authMiddleware, authorizeMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, authorizeMiddleware, userController.deleteUser);

export default router;
