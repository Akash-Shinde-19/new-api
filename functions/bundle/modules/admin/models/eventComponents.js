"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventFee = exports.EventTax = exports.EventLocation = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _schemaComposer = require("../schema/schemaComposer");

var EventLocation = new _mongoose.Schema({
  address1: {
    type: String,
    required: false
  },
  address2: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  state: {
    type: String,
    required: false
  },
  zip: {
    type: String,
    required: false
  }
});
exports.EventLocation = EventLocation;
var EventTax = new _mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: false
  },
  isExclusive: {
    type: Boolean,
    required: false
  }
});
exports.EventTax = EventTax;
var EventFee = new _mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: false
  },
  isExclusive: {
    type: Boolean,
    required: false
  },
  Web: {
    type: Boolean,
    required: false
  },
  BoxOffice: {
    type: Boolean,
    required: false
  },
  Mobile: {
    type: Boolean,
    required: false
  },
  Kiosk: {
    type: Boolean,
    required: false
  }
});
exports.EventFee = EventFee;