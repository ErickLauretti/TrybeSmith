import bcrypt from 'bcryptjs';
import chai, { expect } from 'chai';
import { Request, Response } from 'express';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import UserModel from '../../../src/database/models/user.model';
import { SALT_ROUNDS } from '../../../src/database/seeders/1-users';
import { validateUserNameAndPassword, validateUserNameAndPasswordExist } from '../../../src/middlewares/userName.middlewares';

chai.use(sinonChai);

describe('Testando a camada Service, pagina de Login', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Testando a chamada do middleware validateUserNameAndPassword com aprovacao', async function () {
    const next = sinon.stub().returns({});
    const mock = UserModel.build({
      id: 2,
      password: bcrypt.hashSync('NarutoNinja', SALT_ROUNDS),
      level: 101,
      username: 'Naruto',
      vocation: 'Ninja',
    });
    sinon.stub(UserModel, 'findOne').resolves(mock);

    req.body = {
      username: 'Naruto',
      password: "NarutoNinja"
    };
    await validateUserNameAndPasswordExist(req, res, next);
    expect(next).to.have.been.calledWithExactly();
  });

  it('Testando a chamada do middleware validateUserNameAndPasswordExist com aprovacao', function () {
    const next = sinon.stub().returns({});
    req.body = {
      username: 'Naruto',
      password: 'NInja',
    };
    validateUserNameAndPassword(req, res, next);
    expect(next).to.have.been.calledWithExactly();
  });

  it('Testando a chamada do middleware validateUserNameAndPassword em caso de erro', async function () {
    const next = sinon.stub().returns({});
    const mock = UserModel.build({
      id: 2,
      password: bcrypt.hashSync('NarutoNinja', SALT_ROUNDS),
      level: 101,
      username: 'Naruto',
      vocation: 'Ninja',
    });
    sinon.stub(UserModel, 'findOne').resolves(mock);

    req.body = {
      username: 'Naruto',
      password: "NarutoCovarde"
    };
    await validateUserNameAndPasswordExist(req, res, next);
    expect(res.status).to.be.calledWith(401);
    expect(res.json).to.be.calledWithExactly({
      message: "Username or password invalid",
    });
  });

  it('Testando a chamada do middleware validateUserNameAndPasswordExist em caso de erro', function () {
    const next = sinon.stub().returns({});
    req.body = {
      username: 'Naruto',
    };
    validateUserNameAndPassword(req, res, next);
    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.be.calledWithExactly({
      message: '"username" and "password" are required',
    });
  });


});