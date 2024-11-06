import express from 'express';
import { authMiddleware, authorizeMiddleware } from '../../middleware/auth.middleware';
import { createCheckoutSession } from './payment.controller';

const router = express.Router();

router.post('/', createCheckoutSession);

export default router;
