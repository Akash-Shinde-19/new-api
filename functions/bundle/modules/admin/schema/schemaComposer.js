"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composeWithMongoose = composeWithMongoose;
exports.convertSchemaToGraphQL = convertSchemaToGraphQL;
Object.defineProperty(exports, "Resolver", {
  enumerable: true,
  get: function get() {
    return _graphqlCompose.Resolver;
  }
});
exports.schemaComposer = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _graphqlCompose = require("graphql-compose");

var _node = require("graphql-compose-mongoose/node8");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var schemaComposer = new _graphqlCompose.SchemaComposer();
exports.schemaComposer = schemaComposer;

function composeWithMongoose(model, opts) {
  return (0, _node.composeWithMongoose)(model, _objectSpread({
    schemaComposer: schemaComposer
  }, opts));
}

function convertSchemaToGraphQL(ms, typeName) {
  return (0, _node.convertSchemaToGraphQL)(ms, typeName, schemaComposer);
}