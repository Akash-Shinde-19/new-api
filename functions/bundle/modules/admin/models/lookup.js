"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LookupITC = exports.ResponseTC = exports.LookupTC = exports.Lookup = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _schemaComposer = require("../schema/schemaComposer");

var _graphqlCompose = require("graphql-compose");

var _product = require("./product");

var _account = require("./account");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var LookupSchema = new _mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: true
  },
  values: {
    type: [Object],
    required: true
  }
}, {
  collection: 'lookups'
}, {
  timestamps: true
});
var ResponseSchema = new _mongoose.Schema({
  type: {
    type: String,
    required: false
  },
  value: {
    type: String,
    required: false
  }
});
var Lookup = (0, _mongoose.model)('Lookup', LookupSchema);
exports.Lookup = Lookup;
var LookupTC = (0, _schemaComposer.composeWithMongoose)(Lookup);
exports.LookupTC = LookupTC;
var Response = (0, _mongoose.model)('Response', ResponseSchema);
var ResponseTC = (0, _schemaComposer.composeWithMongoose)(Response);
exports.ResponseTC = ResponseTC;
var LookupITC = LookupTC.getInputTypeComposer();
exports.LookupITC = LookupITC;
LookupTC.addResolver({
  name: 'lookupById',
  type: LookupTC,
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
              return Lookup.findOne({
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
LookupTC.addResolver({
  name: 'lookupByType',
  type: LookupTC,
  args: {
    type: 'String'
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
              return Lookup.findOne({
                type: args.type
              });

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
LookupTC.addResolver({
  name: 'createLookup',
  type: LookupTC,
  args: {
    lookup: LookupITC
  },
  resolve: function () {
    var _resolve3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref3) {
      var source, args, context, info, lookup;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              source = _ref3.source, args = _ref3.args, context = _ref3.context, info = _ref3.info;
              _context3.next = 3;
              return Lookup.create(_objectSpread({}, args.lookup));

            case 3:
              lookup = _context3.sent;
              return _context3.abrupt("return", lookup);

            case 5:
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

var uniq_fast = function uniq_fast(a) {
  var seen = {};
  var out = [];
  var len = a.length;
  var j = 0;

  for (var i = 0; i < len; i++) {
    var item = a[i];

    if (seen[item] !== 1) {
      seen[item] = 1;
      out[j++] = item;
    }
  }

  return out;
};

LookupTC.addResolver({
  name: 'getAllLookups',
  type: [ResponseTC],
  args: {
    type: 'String'
  },
  resolve: function () {
    var _resolve4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref4) {
      var source, args, context, info, data, lookUps, accountData, businessTags, productData;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              source = _ref4.source, args = _ref4.args, context = _ref4.context, info = _ref4.info;
              _context4.next = 3;
              return Lookup.find();

            case 3:
              data = _context4.sent;
              lookUps = [ResponseTC];
              data.filter(function (e) {
                return e.type === "Cities" || e.type === "ActivityTypes";
              }).forEach(function (element) {
                if (element.values.length > 0) {
                  var values = element.values;
                  values.forEach(function (val) {
                    if (val.name != undefined && val.name != null) {
                      var response = {};
                      response.type = element.type;
                      response.value = val.name;
                      lookUps.push(response);
                    }
                  });
                }
              });
              _context4.next = 8;
              return _account.Account.find();

            case 8:
              accountData = _context4.sent;
              businessTags = data.filter(function (d) {
                return d.type === "Business Tags";
              });
              accountData.forEach(function (element) {
                var response = {};
                response.type = 'venue';
                response.value = element.venueName;
                lookUps.push(response);

                if (!lookUps.filter(function (x) {
                  return x.value === element.venueType;
                }) || lookUps.filter(function (x) {
                  return x.value === element.venueType;
                }).length == 0) {
                  response = {};
                  response.type = 'Account Tags';
                  response.value = element.venueType;
                  lookUps.push(response);
                }

                element.tags.forEach(function (tagelement) {
                  var data = businessTags[0].values.filter(function (bt) {
                    return bt.value === tagelement;
                  });

                  if (!lookUps.filter(function (x) {
                    return x.value === data[0].name;
                  }) || lookUps.filter(function (x) {
                    return x.value === data[0].name;
                  }).length == 0) {
                    response = {};
                    response.type = "Business Tags";
                    response.value = data[0].name;
                    lookUps.push(response);
                  }
                });
              });
              _context4.next = 13;
              return _product.Product.find();

            case 13:
              productData = _context4.sent;
              productData.forEach(function (element) {
                var response = {};
                response.type = 'product';
                response.value = element.name;
                lookUps.push(response);
              });
              return _context4.abrupt("return", lookUps);

            case 16:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function resolve(_x4) {
      return _resolve4.apply(this, arguments);
    }

    return resolve;
  }()
});
LookupTC.addResolver({
  name: 'updateLookup',
  type: 'Boolean',
  args: {
    lookup: LookupITC
  },
  resolve: function () {
    var _resolve5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_ref5) {
      var source, args, context, info, _lookup, lookup;

      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              source = _ref5.source, args = _ref5.args, context = _ref5.context, info = _ref5.info;
              _context5.next = 3;
              return Lookup.findOne({
                _id: args.lookup._id
              });

            case 3:
              _lookup = _context5.sent;

              if (!_lookup) {
                _context5.next = 10;
                break;
              }

              _context5.next = 7;
              return _lookup.updateOne(_objectSpread({}, args.lookup));

            case 7:
              lookup = _context5.sent;
              _context5.next = 11;
              break;

            case 10:
              return _context5.abrupt("return", new Error('Lookup does not exists'));

            case 11:
              return _context5.abrupt("return", true);

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function resolve(_x5) {
      return _resolve5.apply(this, arguments);
    }

    return resolve;
  }()
});