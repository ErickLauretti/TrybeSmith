import { expect } from 'chai';
import sinon from 'sinon';
import OrderModel from '../../../src/database/models/order.model';
import ProductModel from '../../../src/database/models/product.model';
import UserModel from '../../../src/database/models/user.model';
import ordersService from '../../../src/service/order.service';


describe('Testando a camada Service, pagina de orders', function () {
  beforeEach(function () { sinon.restore(); });

  it('Testando se vem certos orders', async function(){
    const mock = [
   {
     dataValues: {
       id: 1,
       userId: 1,
     },
   }
 ];

 const list = [
   {
     id: 1,
     userId: 1,
     productIds: [],
   }
 ];

 sinon.stub(OrderModel, 'findAll').resolves(mock as any);
 sinon.stub(ProductModel, 'findAll').resolves([]);

 const result = await ordersService.getOrders();

 expect(result).to.deep.equal(list.map(item => ({ ...item, productIds: item.productIds })));
})

  it('Testando se vem todos os orders', async function(){
       const mock = [
      {
        dataValues: {
          id: 1,
          userId: 1,
          productIds: [{ id: 2 }, { id: 1 }]
        },
        productIds: [{ id: 2 }, { id: 1 }]
      }
    ];

    const list = [
      {
        id: 1,
        userId: 1,
        productIds: [2, 1],
      }
    ];

    sinon.stub(OrderModel, 'findAll').resolves(mock as any);
    sinon.stub(ProductModel, 'findAll').resolves(mock[0].productIds as any);

    const result = await ordersService.getOrders();

    expect(result).to.deep.equal(list.map(item => ({ ...item, productIds: item.productIds })));
  })

  it('Testando criar um order undefined', async function() {
    sinon.stub(UserModel, 'findOne').resolves(undefined);
    const res = await ordersService.postOrder(2000, [2]);
    expect(res.status).to.equal(404);
  });

});