import { ProductTC } from '../models/product';


export const ProductQuery = {
  productById: ProductTC.getResolver('productById'),
  productOne: ProductTC.getResolver('findOne'),
  productMany: ProductTC.getResolver('findMany'),
  productCount: ProductTC.getResolver('count'),
  productConnection: ProductTC.getResolver('connection')
};

export const ProductMutation = {
  saveProduct: ProductTC.getResolver('saveProduct'),
  updateProduct:ProductTC.getResolver('updateProduct')
};
