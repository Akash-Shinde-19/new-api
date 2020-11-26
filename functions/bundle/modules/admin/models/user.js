"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUserInput = exports.UserTC = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _schemaComposer = require("../schema/schemaComposer");

var _account = require("./account");

var _graphqlCompose = require("graphql-compose");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var UserSchema = new _mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  account: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'account'
  },
  roles: [{
    type: String
  }],
  createdBy: {
    type: String
  }
}, {
  timestamps: true
});
var User = (0, _mongoose.model)('User', UserSchema);
var UserTC = (0, _schemaComposer.composeWithMongoose)(User);
exports.UserTC = UserTC;
UserTC.addRelation('account', {
  resolver: function resolver() {
    return _account.AccountTC.getResolver('findOne');
  },
  prepareArgs: {
    filter: function filter(source) {
      return {
        userId: source.userId
      };
    },
    skip: null,
    sort: null
  },
  projection: {
    account: true
  }
});
UserTC.addResolver({
  name: 'userById',
  type: UserTC,
  args: {
    userId: 'String'
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
              return User.findOne({
                userId: args.userId
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

var createUserInput = _graphqlCompose.schemaComposer.createObjectTC({
  name: 'CreateUser',
  fields: {
    name: 'String',
    userId: 'String',
    firstName: 'String',
    lastName: 'String',
    email: 'String',
    phone: 'String',
    roles: ["String"],
    createdBy: "String"
  }
});

exports.createUserInput = createUserInput;
UserTC.addResolver({
  name: 'createUser',
  type: UserTC,
  args: {
    user: (0, _graphqlCompose.toInputObjectType)(createUserInput)
  },
  resolve: function () {
    var _resolve2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref2) {
      var source, args, context, info, _user, user;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              source = _ref2.source, args = _ref2.args, context = _ref2.context, info = _ref2.info;
              _context2.next = 3;
              return User.findOne({
                email: args.user.email
              });

            case 3:
              _user = _context2.sent;

              if (!_user) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return", new Error("User already exists"));

            case 6:
              _context2.next = 8;
              return User.create(_objectSpread({}, args.user));

            case 8:
              user = _context2.sent;
              return _context2.abrupt("return", user);

            case 10:
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
UserTC.addResolver({
  name: 'updateUser',
  type: 'Boolean',
  args: {
    user: (0, _graphqlCompose.toInputObjectType)(createUserInput)
  },
  resolve: function () {
    var _resolve3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref3) {
      var source, args, context, info, _user, user;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              source = _ref3.source, args = _ref3.args, context = _ref3.context, info = _ref3.info;
              _context3.next = 3;
              return User.findOne({
                email: args.user.email
              });

            case 3:
              _user = _context3.sent;

              if (!_user) {
                _context3.next = 10;
                break;
              }

              _context3.next = 7;
              return _user.updateOne(_objectSpread({}, args.user));

            case 7:
              user = _context3.sent;
              _context3.next = 11;
              break;

            case 10:
              return _context3.abrupt("return", new Error("User does not exists"));

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
UserTC.addResolver({
  name: 'deleteUser',
  type: 'Boolean',
  args: {
    userId: 'String'
  },
  resolve: function () {
    var _resolve4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref4) {
      var source, args, context, info, _user, user;

      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              source = _ref4.source, args = _ref4.args, context = _ref4.context, info = _ref4.info;
              _context4.next = 3;
              return User.findOne({
                userId: args.userId
              });

            case 3:
              _user = _context4.sent;

              if (!_user) {
                _context4.next = 10;
                break;
              }

              _context4.next = 7;
              return _user.deleteOne({
                userId: args.userId
              });

            case 7:
              user = _context4.sent;
              _context4.next = 11;
              break;

            case 10:
              return _context4.abrupt("return", new Error("User does not exists"));

            case 11:
              return _context4.abrupt("return", true);

            case 12:
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
}); //export { userModel as default };