import { Request, Response, NextFunction } from 'express';

export async function validateName(
  req: Request,
  res: Response,
  next: NextFunction,
):
  Promise<Response<{ message: string }, Record<string, string>> | undefined> {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (name.length <= 2) {
    return res.status(422).json({ message: '"name" length must be at least 3 characters long' });
  }
  if (typeof name !== 'string') {
    return res.status(422).json({ message: '"name" must be a string' });
  }
  next();
}

export default {
  validateName,
};