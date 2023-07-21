import bcrypt from 'bcryptjs';
import chai, { expect } from 'chai';
import { Request, Response } from 'express';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import loginController from '../../../src/controllers/login.controller';
import UserModel from '../../../src/database/models/user.model';
import { SALT_ROUNDS } from '../../../src/database/seeders/1-users';
import loginService from '../../../src/service/login.service';
import { Login } from '../../../src/types/Login';
import { makeToken } from '../../../src/utils/jwt';


chai.use(sinonChai);

describe('Testes da camada Controller, pagina Login', function () {
  const req = {} as Request & { user: Login };
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

it('Testando se o Token da erro', async function (){
  const mock = UserModel.build({
    id: 1,
    password: bcrypt.hashSync('ninja', SALT_ROUNDS),
    level: 10,
    username: 'Naruto',
    vocation: 'Ninja',
  });
  sinon.stub(UserModel, 'findOne').resolves(mock);

  req.body = {
    username: 'Naruto',
    password: "ninja"
  };

  const usuario = {
    id: 1,
    username: 'Naruto',
  }
  req.user = usuario;
  sinon.stub(loginService, 'makeLogin').resolves(undefined);
  await loginController.makeLogin(req, res);
  expect(res.status).to.have.been.calledWith(400);
  expect(res.json).to.have.been.calledWith({ message: 'token not created' })
})

it('Testando se o Token e feito com sucesso', async function (){
  const userMock = UserModel.build({
    id: 1,
    password: bcrypt.hashSync('NarutoNinja', SALT_ROUNDS),
    level: 10,
    username: 'Naruto',
    vocation: 'Ninja',
  });
  sinon.stub(UserModel, 'findOne').resolves(userMock);

  req.body = {
    username: 'Naruto',
    password: "NarutoNinja"
  };

  const user = {
    id: 1,
    username: 'Naruto',
  }
  req.user = user;
  await loginController.makeLogin(req, res);
  expect(res.status).to.have.been.calledWith(200);
  expect(res.json).to.have.been.calledWith({
    token: makeToken(user)
})
})



});