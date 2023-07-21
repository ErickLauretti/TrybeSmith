import { Router } from 'express';
import loginController from '../controllers/login.controller';
import {
  validateUserNameAndPassword,
  validateUserNameAndPasswordExist,
} from '../middlewares/userName.middlewares';

const loginRouter = Router();

loginRouter.post(
  '/', 
  validateUserNameAndPassword,
  validateUserNameAndPasswordExist,
  loginController.makeLogin,
);

export default loginRouter;