"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserMutation = exports.UserQuery = void 0;

var _user = require("../models/user");

var UserQuery = {
  userById: _user.UserTC.getResolver('userById'),
  userOne: _user.UserTC.getResolver('findOne'),
  users: _user.UserTC.getResolver('findMany'),
  userCount: _user.UserTC.getResolver('count'),
  userConnection: _user.UserTC.getResolver('connection')
};
exports.UserQuery = UserQuery;
var UserMutation = {
  createUser: _user.UserTC.getResolver('createUser'),
  updateUser: _user.UserTC.getResolver('updateUser'),
  deleteUser: _user.UserTC.getResolver('deleteUser')
};
exports.UserMutation = UserMutation;