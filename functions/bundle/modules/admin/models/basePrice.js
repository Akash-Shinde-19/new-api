"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BasePriceSchema = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _schemaComposer = require("../schema/schemaComposer");

var BasePriceSchema = new _mongoose.Schema({
  productType: {
    type: String,
    required: true
  },
  retail: {
    type: Number,
    required: false
  },
  wholesale: {
    type: Number,
    required: true
  }
});
exports.BasePriceSchema = BasePriceSchema;