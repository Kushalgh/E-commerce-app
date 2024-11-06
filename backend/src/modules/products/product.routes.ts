import express from 'express';
import * as productController from './product.controller';
import { authMiddleware, authorizeMiddleware } from '../../middleware/auth.middleware';

const router = express.Router();

router.post('/', authMiddleware, authorizeMiddleware, productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);
router.put('/:id', authMiddleware, authorizeMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, authorizeMiddleware, productController.deleteProduct);

export default router;
