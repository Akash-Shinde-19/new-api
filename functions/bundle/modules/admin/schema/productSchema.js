"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductMutation = exports.ProductQuery = void 0;

var _product = require("../models/product");

var ProductQuery = {
  productById: _product.ProductTC.getResolver('productById'),
  productOne: _product.ProductTC.getResolver('findOne'),
  productMany: _product.ProductTC.getResolver('findMany'),
  productCount: _product.ProductTC.getResolver('count'),
  productConnection: _product.ProductTC.getResolver('connection')
};
exports.ProductQuery = ProductQuery;
var ProductMutation = {
  saveProduct: _product.ProductTC.getResolver('saveProduct'),
  updateProduct: _product.ProductTC.getResolver('updateProduct')
};
exports.ProductMutation = ProductMutation;