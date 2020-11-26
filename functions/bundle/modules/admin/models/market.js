"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarketITC = exports.MarketTC = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _schemaComposer = require("../schema/schemaComposer");

var _city = require("./city");

var _graphqlCompose = require("graphql-compose");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var MarketSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  selected: {
    type: Boolean,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  cities: [_city.CitySchema]
}, {
  collection: 'markets'
}, {
  timestamps: true
});
var Market = (0, _mongoose.model)('Market', MarketSchema);
var MarketTC = (0, _schemaComposer.composeWithMongoose)(Market);
exports.MarketTC = MarketTC;
var MarketITC = MarketTC.getInputTypeComposer(); // MarketTC.addRelation('cities', {
//     resolver: () => CityTC.getResolver('findMany'),
//     prepareArgs: {
//         filter: (source) => ({ marketId: source._id }),
//         skip: null,
//         sort: null,
//     },
//     projection: { cities: true },
// });

exports.MarketITC = MarketITC;
MarketTC.addResolver({
  name: 'marketById',
  type: MarketTC,
  args: {
    _id: 'String'
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
              return Market.findOne({
                _id: args._id
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
MarketTC.addResolver({
  name: 'createMarket',
  type: MarketTC,
  args: {
    market: MarketITC
  },
  resolve: function () {
    var _resolve2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref2) {
      var source, args, context, info, market;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              source = _ref2.source, args = _ref2.args, context = _ref2.context, info = _ref2.info;
              _context2.next = 3;
              return Market.create(_objectSpread({}, args.market));

            case 3:
              market = _context2.sent;
              return _context2.abrupt("return", market);

            case 5:
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
MarketTC.addResolver({
  name: 'updateMarket',
  type: 'Boolean',
  args: {
    market: MarketITC
  },
  resolve: function () {
    var _resolve3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref3) {
      var source, args, context, info, _market, market;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              source = _ref3.source, args = _ref3.args, context = _ref3.context, info = _ref3.info;
              _context3.next = 3;
              return Market.findOne({
                _id: args.market._id
              });

            case 3:
              _market = _context3.sent;

              if (!_market) {
                _context3.next = 10;
                break;
              }

              _context3.next = 7;
              return _market.updateOne(_objectSpread({}, args.market));

            case 7:
              market = _context3.sent;
              _context3.next = 11;
              break;

            case 10:
              return _context3.abrupt("return", new Error("Market does not exists"));

            case 11:
              return _context3.abrupt("return", true);

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function resolve(_x3) {
      return _resolve3.apply(this, arguments);
    }

    return resolve;
  }()
});