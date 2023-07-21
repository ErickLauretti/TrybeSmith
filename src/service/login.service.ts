import { Login } from '../types/Login';
import { makeToken } from '../utils/jwt';

async function makeLogin(payload: Login): Promise<string> {
  const token = makeToken(payload);
  return token;
}

export default {
  makeLogin,
};