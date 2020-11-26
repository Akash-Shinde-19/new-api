"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuestInformationSchema = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _schemaComposer = require("../schema/schemaComposer");

var _graphqlCompose = require("graphql-compose");

var GuestInformationSchema = new _mongoose.Schema({
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  address1: {
    type: String,
    required: false
  },
  address2: {
    type: String,
    required: false
  },
  zipcode: {
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
  country: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});
exports.GuestInformationSchema = GuestInformationSchema;