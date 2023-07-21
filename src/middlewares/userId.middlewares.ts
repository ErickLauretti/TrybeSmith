import { Request, Response, NextFunction } from 'express';

function validateUserId(req: Request, res: Response, next: NextFunction): void {
  const { userId } = req.body;
  if (!userId) {
    res.status(400).json({ message: '"userId" is required' });
    return;
  }

  if (typeof userId !== 'number' || userId === undefined) {
    res.status(422).json({ message: '"userId" must be a number' });
    return;
  }
  next();
}

export default validateUserId;