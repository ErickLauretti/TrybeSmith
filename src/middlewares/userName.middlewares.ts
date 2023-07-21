import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import UserModel from '../database/models/user.model';
import { Login } from '../types/Login';

export async function validateUserNameAndPassword(
  req: Request,
  res: Response,
  next: NextFunction,
):
  Promise<Response<unknown, Record<string, unknown>> | undefined> {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: '"username" and "password" are required' });
  }
  next();
}

export async function validateUserNameAndPasswordExist(
  req: Request,
  res: Response,
  next: NextFunction,
):
  Promise<Response<unknown, Record<string, unknown>> | undefined> {
  const { username, password } = req.body;
  const usuario = await UserModel.findOne({ where: { username } });
  if (!usuario || !bcrypt.compareSync(password, usuario.dataValues.password)) {
    return res.status(401).json({ message: 'Username or password invalid' });
  }
  (req as Request &
  { user: Login })
    .user = { id: usuario.dataValues.id, username: usuario.dataValues.username };
  next();
}