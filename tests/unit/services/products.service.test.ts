import { expect } from 'chai';
import sinon from 'sinon';
import ProductModel from '../../../src/database/models/product.model';
import productsService from '../../../src/service/product.service';
import { Product } from '../../../src/types/Product';


describe('Testando a camada Service, pagina de produtos', function () {
  beforeEach(function () { sinon.restore(); });

  it('Testando se vem todos os produtos', async function() {
    const mockPrimario = ProductModel.build({
      id: 1,
      name: "Garra do Wolverine",
      price: "10 peças de ouro",
      orderId: 1
    },)

    const mockSecundario = ProductModel.build({
      id: 2,
      name: "Manopla do Thanos",
      price: "10 peças de ouro",
      orderId: 1
    },)
  
    const listProducts = [mockPrimario, mockSecundario]
  
    sinon.stub(ProductModel, 'findAll').resolves(listProducts);

    const result = await productsService.getProduct();
    expect(result).to.be.equal(listProducts)
  })

  it('Testando o cadastramento de produtos', async function (){
    const mock = ProductModel.build({
      name: "Garra do Wolverine",
      price: "10 peças de ouro",
      orderId: 4});

    sinon.stub(ProductModel, 'create').resolves(mock);

    const name = 'Garra do Wolverine';
    const price = '10 peças de ouro';
    const orderId = 4;
    const result = await productsService.makeProduct({name, price, orderId } as Product);
    expect(result.dataValues).to.be.equal(mock.dataValues)
  })


});
