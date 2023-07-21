import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import UserModel from '../database/models/user.model';
import { OrdersReturn } from '../types/Order';
import { Orders } from '../types/Orders';
import { ServiceResponse } from '../types/ServiceReq';

async function getOrders(): Promise<OrdersReturn[]> {
  const orders = await OrderModel.findAll({
    include: [{ model: ProductModel, as: 'productIds', attributes: ['id'] }],
  });

  const arrayOrder = orders.map(({ dataValues: order }) => ({
    id: order.id,
    userId: order.userId,
    productIds: order.productIds?.map((event) => event.id) || [],
  }));

  return arrayOrder;
}

async function postOrder(
  userId: any,
  productIds: number[],
): Promise<ServiceResponse<Orders>> {
  const usuario = await UserModel.findOne({ where: { id: userId } });
  if (!usuario) {
    return { status: 404, data: { message: '"userId" not found' } };
  }
  const create = await OrderModel.create({ userId });
  const newOrder = create.dataValues.id;
  await ProductModel.update(
    { orderId: Number(newOrder) },
    { where: { id: productIds } },
  );
  return { status: 201, data: { userId, productIds } };
}

export default {
  getOrders,
  postOrder,
};