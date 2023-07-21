import { Request, Response, NextFunction } from 'express';
import { verify } from '../utils/jwt';

const validateJWT = (req: Request, res: Response, next: NextFunction): Response | void => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const betweenToken = token.split(' ');
  const tokenBetween = betweenToken[1];
  try {
    res.locals.user = verify(tokenBetween);
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default validateJWT;