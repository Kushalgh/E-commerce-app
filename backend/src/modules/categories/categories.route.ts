import express from 'express';
import { getCategory, createCategory, updateCategory } from '../categories/categories.controller';

const router = express.Router();

router.get('/categories', getCategory);

router.post('/categories', createCategory);

router.put('/categories/:id', updateCategory);

export default router;
