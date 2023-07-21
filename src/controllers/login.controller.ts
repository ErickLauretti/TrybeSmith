import { Request, Response } from 'express';
import loginService from '../service/login.service';
import { Login } from '../types/Login';

async function makeLogin(req: Request, res: Response):
Promise<Response<unknown, Record<string, unknown>> | undefined> {
  const payload = (req as Request & { user: Login }).user;
  const result = await loginService.makeLogin(payload);
  if (result) {
    return res.status(200).json({ token: result });
  }
  return res.status(400).json({ message: 'token not created' });
}

export default {
  makeLogin,
};