"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SalesAccessSchema = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _schemaComposer = require("../schema/schemaComposer");

var SalesAccessSchema = new _mongoose.Schema({
  revealCode: {
    type: String,
    required: false
  },
  isModePublic: {
    type: Boolean,
    required: false
  },
  isModePrivate: {
    type: Boolean,
    required: false
  },
  isMySalesChannel: {
    type: Boolean,
    required: false
  },
  isLocalPartners: {
    type: Boolean,
    required: false
  },
  isLocalAndNationalSearch: {
    type: Boolean,
    required: false
  }
});
exports.SalesAccessSchema = SalesAccessSchema;