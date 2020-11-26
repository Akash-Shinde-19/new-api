"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductDetailSchema = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _schemaComposer = require("../schema/schemaComposer");

var _days = require("./days");

var ProductDetailSchema = new _mongoose.Schema({
  product: {
    type: String,
    required: false
  },
  retail: {
    type: Number,
    required: false
  },
  wholesale: {
    type: Number,
    required: false
  },
  items: [_days.DaysSchema]
});
exports.ProductDetailSchema = ProductDetailSchema;