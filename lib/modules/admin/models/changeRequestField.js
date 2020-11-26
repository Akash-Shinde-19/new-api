"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeRequestFieldSchema = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _schemaComposer = require("../schema/schemaComposer");

var _dailySchedule = require("./dailySchedule");

var _dayPart = require("./dayPart");

var ChangeRequestFieldSchema = new _mongoose.Schema({
  field: {
    type: String,
    required: false
  },
  currentValue: {
    type: String,
    required: false
  },
  newValue: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});
exports.ChangeRequestFieldSchema = ChangeRequestFieldSchema;