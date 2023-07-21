import express from 'express';
import productRouter from './router/product.router';
import orderRouter from './router/order.router';
import loginRouter from './router/login.router';

const app = express();

app.use(express.json());

app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/login', loginRouter);

export default app;
