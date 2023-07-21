import { Request, Response, NextFunction } from 'express';

function validateProductIds(req: Request, res: Response, next: NextFunction): void {
  const { productIds } = req.body;
  if (!productIds) {
    res.status(400).json({ message: '"productIds" is required' });
    return;
  }
  
  if (typeof productIds !== 'object' || productIds === undefined) {
    res.status(422).json({ message: '"productIds" must be an array' });
    return;
  }
  
  if (productIds.length === 0) {
    res.status(422).json({ message: '"productIds" must include only numbers' });
    return;
  }
  next();
}
  
export default validateProductIds;