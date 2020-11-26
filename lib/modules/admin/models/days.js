"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DaysSchema = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _schemaComposer = require("../schema/schemaComposer");

var DaysSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  isClosed: {
    type: Boolean,
    required: false
  },
  retail: {
    type: Number,
    required: false
  },
  wholesale: {
    type: Number,
    required: false
  }
});
exports.DaysSchema = DaysSchema;