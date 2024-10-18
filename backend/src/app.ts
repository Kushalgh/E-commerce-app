import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database';
import { errorHandler } from './middleware/error-handler';
import productRoutes from './modules/products/product.routes';
import orderRoutes from './modules/orders/order.routes';
import userRoutes from './modules/users/user.routes';
import uploadRoute from './modules/uploads/upload.route';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoute);

app.use(errorHandler);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

export default app;
