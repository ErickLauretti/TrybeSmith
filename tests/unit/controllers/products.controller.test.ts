import chai, { expect } from 'chai';
import { Request, Response } from 'express';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../../../src/app';
import productsController from '../../../src/controllers/product.controller';
import ProductModel from '../../../src/database/models/product.model';
import productsService from '../../../src/service/product.service';

chai.use(sinonChai);

describe('Testando a camada Controller, pagina de produtos', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Testando o cadastramento de novos produtos', async function() {
    const mock = ProductModel.build({
      name: "Garra do Wolverine",
      price: "10 peças de ouro",
      orderId: 4});
  
    req.body = mock;

    sinon.stub(productsService, 'makeProduct').resolves(mock);
    await productsController.makeProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(mock);
  })

  it('Testando se vem todos produtos', async function() {
    const mockPrimario = ProductModel.build({
      id: 1,
      name: "Garra do Wolverine",
      price: "10 peças de ouro",
      orderId: 1
    },)

    const mockSecundario = ProductModel.build({
      id: 2,
      name: "Manopla do Thanos",
      price: "20 peças de ouro",
      orderId: 1
    },)

    const products = [mockPrimario, mockSecundario]

    req.body = products;

    sinon.stub(productsService, 'getProduct').resolves(products);
    await productsController.getProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products);
  })

  it('Testando se sem o preco, vem o erro', async function () {
    const mock = {
      name: "Garra do Wolverine",
    }

    const responseServer = await chai.request(app).post('/products').send(mock);

    expect(responseServer.status).to.equal(400);
    expect(responseServer.body).to.be.deep.equal({message: '"price" is required'});

  });

  it('Testando se com o preco fora dos padroes, vem o erro', async function () {
    const mock = {
      name: "Garra do Wolverine",
      price: "0",
    }

    const responseServer = await chai.request(app).post('/products').send(mock);

    expect(responseServer.status).to.equal(422);
    expect(responseServer.body).to.be.deep.equal({message: '"price" length must be at least 3 characters long'});

  });

  it('Testando se com o preco fora dos padroes, vem o erro 2', async function () {
    const mock = {
      name: "Garra do Wolverine",
      price: 0,
    }

    const responseServer = await chai.request(app).post('/products').send(mock);

    expect(responseServer.status).to.equal(400);
    expect(responseServer.body).to.be.deep.equal({message: '"price" is required'});

  });

  it('Testando se com o nome fora dos padroes, vem o erro', async function () {
    const mock = {
      name: 0,
      price: "20 pecas de ouro",
    }

    const responseServer = await chai.request(app).post('/products').send(mock);

    expect(responseServer.status).to.equal(400);
    expect(responseServer.body).to.be.deep.equal({message: '"name" is required'});

  });

});
