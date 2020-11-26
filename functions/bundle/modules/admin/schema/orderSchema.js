"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrderMutation = exports.OrderQuery = void 0;

var _order = require("../models/order");

var OrderQuery = {
  orderById: _order.OrderTC.getResolver('orderById'),
  orderOne: _order.OrderTC.getResolver('findOne'),
  orderMany: _order.OrderTC.getResolver('findMany'),
  orderByFilter: _order.OrderTC.getResolver('orderByFilter'),
  orderByBarcode: _order.OrderTC.getResolver('orderByBarcode')
};
exports.OrderQuery = OrderQuery;
var OrderMutation = {
  createOrder: _order.OrderTC.getResolver('createOrder'),
  updateOrder: _order.OrderTC.getResolver('updateOrder'),
  partialRefund: _order.OrderTC.getResolver('partialRefund'),
  redeemTickets: _order.OrderTC.getResolver('redeemTickets')
};
exports.OrderMutation = OrderMutation;