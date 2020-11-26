"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _schemaComposer = require("./schemaComposer");

var _userSchema = require("./userSchema");

var _accountSchema = require("./accountSchema");

var _apolloUploadServer = require("apollo-upload-server");

var _productSchema = require("./productSchema");

var _marketSchema = require("./marketSchema");

var _citySchema = require("./citySchema");

var _lookupSchema = require("./lookupSchema");

var _changeRequestSchema = require("./changeRequestSchema");

var _venueSchema = require("./venueSchema");

var _orderSchema = require("./orderSchema");

var _eventSchema = require("./eventSchema");

var _imageSchema = require("./imageSchema");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

_schemaComposer.schemaComposer.add(_apolloUploadServer.GraphQLUpload);

_schemaComposer.schemaComposer.Query.addFields(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, _userSchema.UserQuery), _accountSchema.AccountQuery), _productSchema.ProductQuery), _marketSchema.MarketQuery), _citySchema.CityQuery), _lookupSchema.LookupQuery), _changeRequestSchema.ChangeRequestQuery), _venueSchema.VenueQuery), _orderSchema.OrderQuery), _eventSchema.EventQuery), _imageSchema.ImageQuery));

_schemaComposer.schemaComposer.Mutation.addFields(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, _userSchema.UserMutation), _accountSchema.AccountMutation), _productSchema.ProductMutation), _marketSchema.MarketMutation), _citySchema.CityMutation), _lookupSchema.LookupMutation), _changeRequestSchema.ChangeRequestMutation), _orderSchema.OrderMutation), _eventSchema.EventMutation), _imageSchema.ImageMutation));

var schema = _schemaComposer.schemaComposer.buildSchema();

exports.schema = schema;