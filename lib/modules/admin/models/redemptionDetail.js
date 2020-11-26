"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedemptionDetailSchema = exports.RedemptionsSchema = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _schemaComposer = require("../schema/schemaComposer");

var _days = require("./days");

var RedemptionsSchema = new _mongoose.Schema({
  date: {
    type: String,
    required: false
  },
  agent: {
    type: String,
    required: false
  },
  device: {
    type: String,
    required: false
  }
});
exports.RedemptionsSchema = RedemptionsSchema;
var RedemptionDetailSchema = new _mongoose.Schema({
  redemptions: {
    type: [RedemptionsSchema],
    required: false
  },
  validStatus: {
    type: String,
    required: false
  },
  usesRemaining: {
    type: Number,
    required: false
  }
});
exports.RedemptionDetailSchema = RedemptionDetailSchema;