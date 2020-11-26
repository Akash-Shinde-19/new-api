/* @flow */
import { OrderTC, OrderITC } from '../models/order';
export const OrderQuery = {
  orderById: OrderTC.getResolver('orderById'),
  orderOne: OrderTC.getResolver('findOne'),
  orderMany: OrderTC.getResolver('findMany'),
  orderByFilter: OrderTC.getResolver('orderByFilter'),
  orderByBarcode: OrderTC.getResolver('orderByBarcode'),
};

export const OrderMutation = {
  createOrder: OrderTC.getResolver('createOrder'),
  updateOrder: OrderTC.getResolver('updateOrder'),
  partialRefund: OrderTC.getResolver('partialRefund'),
  redeemTickets: OrderTC.getResolver('redeemTickets'),
};
