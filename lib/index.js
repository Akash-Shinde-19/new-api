"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _modules = require("./modules");

var _require = require('./modules/admin'),
    localApolloServer = _require.localApolloServer,
    adminApolloServer = _require.adminApolloServer;

_dotenv["default"].config();

(0, _modules.connection)();
var server = localApolloServer();
server.listen(process.env.PORT).then(function (_ref) {
  var url = _ref.url;
  console.log("\uD83D\uDE80 Server ready at ".concat(url, "admin"));
});