import { Request, Response } from 'express';
import productService from '../service/product.service';

async function makeProduct(req: Request, res: Response): Promise<Response> {
  const { name, price, orderId } = req.body;
  const response = await productService.makeProduct({
    name, price, orderId,
  });
  return res.status(201).json(response);
}

async function getProduct(req: Request, res: Response): Promise<Response> {
  const response = await productService.getProduct();
  return res.status(200).json(response);
}

export default {
  makeProduct,
  getProduct,
};