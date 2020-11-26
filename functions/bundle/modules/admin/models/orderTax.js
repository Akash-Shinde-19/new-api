"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrderTaxSchema = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _schemaComposer = require("../schema/schemaComposer");

var _graphqlCompose = require("graphql-compose");

var OrderTaxSchema = new _mongoose.Schema({
  taxName: {
    type: String,
    required: false
  },
  taxAmount: {
    type: Number,
    required: false
  },
  appliedType: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});
exports.OrderTaxSchema = OrderTaxSchema;