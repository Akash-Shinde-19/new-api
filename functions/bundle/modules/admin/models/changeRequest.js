"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeRequestITC = exports.ChangeRequestTC = exports.ChangeRequest = exports.ChangeRequestSchema = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _schemaComposer = require("../schema/schemaComposer");

var _account = require("./account");

var _changeRequestField = require("./changeRequestField");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var ChangeRequestSchema = new _mongoose.Schema({
  accountId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: false
  },
  subType: {
    type: String,
    required: false
  },
  fields: [_changeRequestField.ChangeRequestFieldSchema],
  account: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'account'
  }
}, {
  collection: 'change_requests'
});
exports.ChangeRequestSchema = ChangeRequestSchema;

var ChangeRequest = _mongoose["default"].model('ChangeRequest', ChangeRequestSchema);

exports.ChangeRequest = ChangeRequest;
var ChangeRequestTC = (0, _schemaComposer.composeWithMongoose)(ChangeRequest);
exports.ChangeRequestTC = ChangeRequestTC;
var ChangeRequestITC = ChangeRequestTC.getITC();
exports.ChangeRequestITC = ChangeRequestITC;
ChangeRequestTC.addResolver({
  name: 'changeRequestById',
  type: ChangeRequestTC,
  args: {
    changeRequestId: 'String'
  },
  resolve: function () {
    var _resolve = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
      var source, args, context, info;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              source = _ref.source, args = _ref.args, context = _ref.context, info = _ref.info;
              _context.next = 3;
              return ChangeRequest.findOne({
                _id: args.changeRequestId
              });

            case 3:
              return _context.abrupt("return", _context.sent);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function resolve(_x) {
      return _resolve.apply(this, arguments);
    }

    return resolve;
  }()
});
ChangeRequestTC.addResolver({
  name: 'saveChangeRequest',
  type: ChangeRequestTC,
  args: {
    changeRequest: ChangeRequestITC
  },
  resolve: function () {
    var _resolve2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref2) {
      var source, args, context, info;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              source = _ref2.source, args = _ref2.args, context = _ref2.context, info = _ref2.info;
              _context2.next = 3;
              return ChangeRequest.create(_objectSpread({}, args.changeRequest));

            case 3:
              return _context2.abrupt("return", _context2.sent);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function resolve(_x2) {
      return _resolve2.apply(this, arguments);
    }

    return resolve;
  }()
});
ChangeRequestTC.addRelation('account', {
  resolver: function resolver() {
    return _account.AccountTC.getResolver('findOne');
  },
  prepareArgs: {
    filter: function filter(source) {
      return {
        _id: source.accountId
      };
    },
    skip: null,
    sort: null
  },
  projection: {
    account: true
  }
});