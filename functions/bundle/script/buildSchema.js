"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _graphql = require("graphql");

var _utilities = require("graphql/utilities");

var _schema = _interopRequireDefault(require("../schema"));

function buildSchema() {
  return _buildSchema.apply(this, arguments);
}

function _buildSchema() {
  _buildSchema = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _fsExtra["default"].ensureFile('../data/schema.graphql.json');

          case 2:
            _context.next = 4;
            return _fsExtra["default"].ensureFile('../data/schema.graphql');

          case 4:
            _context.t0 = _fsExtra["default"];
            _context.t1 = _path["default"].join(__dirname, '../data/schema.graphql.json');
            _context.t2 = JSON;
            _context.next = 9;
            return (0, _graphql.graphql)(_schema["default"], _utilities.introspectionQuery);

          case 9:
            _context.t3 = _context.sent;
            _context.t4 = _context.t2.stringify.call(_context.t2, _context.t3, null, 2);

            _context.t0.writeFileSync.call(_context.t0, _context.t1, _context.t4);

            _fsExtra["default"].writeFileSync(_path["default"].join(__dirname, '../data/schema.graphql.txt'), (0, _utilities.printSchema)(_schema["default"]));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _buildSchema.apply(this, arguments);
}

function run() {
  return _run.apply(this, arguments);
}

function _run() {
  _run = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return buildSchema();

          case 2:
            console.log('Schema build complete!');

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _run.apply(this, arguments);
}

run()["catch"](function (e) {
  console.log(e);
  process.exit(0);
});