import express from 'express';
import dotenv from 'dotenv';
import CORS from 'cors';
import sequelize from './config/database';
import { errorHandler } from './middleware/error-handler';
import productRoutes from './modules/products/product.routes';
import orderRoutes from './modules/orders/order.routes';
import userRoutes from './modules/users/user.routes';
import uploadRoute from './modules/uploads/upload.route';
import path from 'path';
import checkOutRoute from './modules/payment/payment.route';
import Stripe from 'stripe';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

app.use(CORS());

app.use(express.json());

app.use('/public', express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoute);

app.use('/api/checkout', checkOutRoute);

app.use(errorHandler);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

export default app;
function cors(): any {
  throw new Error('Function not implemented.');
}
