"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeeSchema = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _schemaComposer = require("../schema/schemaComposer");

var FeeSchema = new _mongoose.Schema({
  feeName: {
    type: String,
    required: false
  },
  feeAmount: {
    type: Number,
    required: false
  },
  feeType: {
    type: String,
    required: false
  },
  appliedType: {
    type: String,
    required: false
  }
});
exports.FeeSchema = FeeSchema;