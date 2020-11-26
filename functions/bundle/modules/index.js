"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connection = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var mongoose = require('mongoose');

var connection = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            console.log({
              connectionString: process.env.MONGO_DB_URL
            });
            mongoose.set('debug', true);
            _context.next = 5;
            return mongoose.connect(process.env.MONGO_DB_URL, {
              useNewUrlParser: true,
              useUnifiedTopology: true
            });

          case 5:
            console.log('Database Connected Successfully');
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.log('failure');
            console.log(_context.t0); //throw error;

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function connection() {
    return _ref.apply(this, arguments);
  };
}();

exports.connection = connection;