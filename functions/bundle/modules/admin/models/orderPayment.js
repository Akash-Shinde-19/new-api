"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrderPaymentSchema = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _schemaComposer = require("../schema/schemaComposer");

var _graphqlCompose = require("graphql-compose");

var OrderPaymentSchema = new _mongoose.Schema({
  transactionType: {
    type: String,
    required: false
  },
  paymentType: {
    type: String,
    required: false
  },
  cardHolderName: {
    type: String,
    required: false
  },
  creditCardType: {
    type: String,
    required: false
  },
  creditCardLastFour: {
    type: String,
    required: false
  },
  amountPaid: {
    type: Number,
    required: false
  },
  orderPaymentStatus: {
    type: Number,
    required: false
  }
}, {
  timestamps: true
});
exports.OrderPaymentSchema = OrderPaymentSchema;