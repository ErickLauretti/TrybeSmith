import { Router } from 'express';
import orderController from '../controllers/order.controller';
import validateJwt from '../middlewares/jwt.middlewares';
import validateProductIds from '../middlewares/productsIds.middlewares';
import validateUserId from '../middlewares/userId.middlewares';

const orderRouter = Router();

orderRouter.get('/', orderController.getOrders);
orderRouter.post(
  '/',
  validateJwt,
  validateUserId,
  validateProductIds,
  orderController.postOrder,
);

export default orderRouter;