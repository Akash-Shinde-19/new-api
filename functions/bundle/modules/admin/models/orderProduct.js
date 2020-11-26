"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrderProductSchema = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _schemaComposer = require("../schema/schemaComposer");

var _graphqlCompose = require("graphql-compose");

var _orderTax = require("./orderTax");

var _orderFees = require("./orderFees");

var _redemptionDetail = require("./redemptionDetail");

var OrderProductSchema = new _mongoose.Schema({
  productId: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: false
  },
  productType: {
    type: String,
    required: false
  },
  barcode: {
    type: String,
    required: false
  },
  orderProductStatus: {
    type: String,
    required: false
  },
  salesPrice: {
    type: Number,
    required: false
  },
  itemPrice: {
    type: Number,
    required: false
  },
  maxVisit: {
    type: Number,
    required: false
  },
  maxVisitPerDay: {
    type: Number,
    required: false
  },
  visitDate: {
    type: String,
    required: false
  },
  orderTax: {
    type: _orderTax.OrderTaxSchema,
    required: false
  },
  orderFees: {
    type: _orderFees.OrderFeesSchema,
    required: false
  },
  redemptionDetail: {
    type: _redemptionDetail.RedemptionDetailSchema,
    required: false
  }
}, {
  timestamps: true
});
exports.OrderProductSchema = OrderProductSchema;