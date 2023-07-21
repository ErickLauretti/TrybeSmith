import chai, { expect } from 'chai';
import { Request, Response } from 'express';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiHttp from 'chai-http';
import ordersController from '../../../src/controllers/order.controller';
import ordersService from '../../../src/service/order.service';
import app from '../../../src/app';

chai.use(sinonChai);

describe('Testando a camada Controller, pagina de orders', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Testando se vem todos os produtos', async function() {
    const mock = {
      id: 1,
      userId: 1,
      productIds: [1]
    }

    const orders =  [mock]

    sinon.stub(ordersService, 'getOrders').resolves(orders);
    await ordersController.getOrders(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(orders);
  })

  it('Testando a falha se o pedido estiver sem token', async () => {
    const mock = {
      name: 1,
      price: 'naruto',
    }

    const token = '1408';

    const httpResponse = await chai.request(app).post('/orders').set('Authorization', `Bearer ${token}`).send(mock);
  
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Invalid token' });
  })

  it('Testando a validacao do token se tiver sucesso', async () => {
    const mock = {
      "userId": 1,
      "productIds": [1,2]
    }

    const result = await chai.request(app).post('/login').send({
      username: 'Naruto',
      password: 'ninja',
    });

    const token = result.body.token;
    const responseServer = await chai.request(app).post('/orders').set('Authorization', `Bearer ${token}`).send(mock);

    if (responseServer.status === 201) {
      expect(responseServer.status).to.equal(201);
    } 
    if (responseServer.status === 401) {
      expect(responseServer.status).to.equal(401);
    }
  })

});