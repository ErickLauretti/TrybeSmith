import { Model } from 'sequelize';
import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import { Product } from '../types/Product';

async function makeProduct(product: Product): Promise<Model<Product>> {
  const result = await ProductModel.create(product);
  return result;
}

async function getProduct(): Promise<Model<Product, ProductInputtableTypes>[]> {
  const result = await ProductModel.findAll();
  return result;
}

export default {
  makeProduct,
  getProduct,
};
