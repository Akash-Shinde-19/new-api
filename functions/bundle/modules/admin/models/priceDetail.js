"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PriceDetailSchema = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _schemaComposer = require("../schema/schemaComposer");

var _productDetail = require("./productDetail");

var PriceDetailSchema = new _mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false
  },
  dayPart: {
    type: String,
    required: true
  },
  products: [_productDetail.ProductDetailSchema]
});
exports.PriceDetailSchema = PriceDetailSchema;