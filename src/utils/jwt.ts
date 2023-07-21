import jwt from 'jsonwebtoken';
import { Token } from '../types/Token';

const secret = process.env.JWT_SECRET || 'secret';

export function makeToken(payload: Token): string {
  const generateToken = jwt.sign(payload, secret);
  return generateToken;
}

export function verify(token: string): Token {
  const result = jwt.verify(token, secret) as Token;
  return result;
}

export default {
  makeToken,
  verify,
};