"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrderFeesSchema = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _schemaComposer = require("../schema/schemaComposer");

var _graphqlCompose = require("graphql-compose");

var OrderFeesSchema = new _mongoose.Schema({
  feeName: {
    type: String,
    required: false
  },
  feeAmount: {
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
exports.OrderFeesSchema = OrderFeesSchema;