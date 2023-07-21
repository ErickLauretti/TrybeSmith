import { Request, Response } from 'express';
import orderService from '../service/order.service';

async function getOrders(req: Request, res: Response): Promise<void> {
  const response = await orderService.getOrders();
  res.status(200).json(response);
}

async function postOrder(req: Request, res: Response): Promise<Response> {
  const { productIds, userId } = req.body;
  const create = await orderService.postOrder(userId, productIds);
  return res.status(create.status).json(create.data);
}

export default {
  getOrders,
  postOrder,
};