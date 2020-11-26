"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _schema = require("./schema/schema");

var _mongodb = require("mongodb");

var ApolloServer = require('apollo-server').ApolloServer; // const schema = require('./schema/schema');


var jwt = require('jsonwebtoken');

var ApolloServerLambda = require('apollo-server-lambda').ApolloServer;

var _require = require('apollo-server-lambda'),
    gql = _require.gql;

var _require2 = require('graphql'),
    GraphQLSchema = _require2.GraphQLSchema;

var mongoose = require('mongoose');

var skipToken = function skipToken(operationName, query) {
  var skipList = ['createUser'];
  var valid = skipList.includes(operationName);

  if (valid) {
    if (query.match(new RegExp(operationName, 'g') || []).length === 2) {
      return true;
    }
  }

  return false;
};

function adminApolloServer() {
  return new ApolloServerLambda({
    schema: _schema.schema,
    context: function () {
      var _context = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                console.log({
                  connectionString: process.env.MONGO_DB_URL
                });
                mongoose.set('debug', true);
                _context2.next = 5;
                return mongoose.connect(process.env.MONGO_DB_URL, {
                  useNewUrlParser: true,
                  useUnifiedTopology: true
                });

              case 5:
                console.log('Database Connected Successfully');
                _context2.next = 12;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                console.log('failure');
                console.log(_context2.t0); //throw error;

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }));

      function context() {
        return _context.apply(this, arguments);
      }

      return context;
    }()
  });
}

function localApolloServer() {
  return new ApolloServer({
    schema: _schema.schema,
    playground: {
      endpoint: '/admin'
    }
  });
}

module.exports = {
  adminApolloServer: adminApolloServer,
  localApolloServer: localApolloServer
};