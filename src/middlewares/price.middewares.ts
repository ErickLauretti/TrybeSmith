import { Request, Response, NextFunction } from 'express';

export async function validatePrice(req: Request, res: Response, next: NextFunction):
Promise<Response<{ message: string }, Record<string, string>> | undefined> {
  const { price } = req.body;
  if (!price) {
    return res.status(400).json({ message: '"price" is required' });
  }
  if (price.length <= 2) {
    return res.status(422).json({ message: '"price" length must be at least 3 characters long' });
  }
  if (typeof price !== 'string') {
    return res.status(422).json({ message: '"price" must be a string' });
  }
  next();
}

export default {
  validatePrice,
};