"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccountMutation = exports.AccountQuery = void 0;

var _account = require("../models/account");

var AccountQuery = {
  accountById: _account.AccountTC.getResolver('accountById'),
  filterAccounts: _account.AccountTC.getResolver('filterAccounts'),
  accountOne: _account.AccountTC.getResolver('findOne'),
  accountMany: _account.AccountTC.getResolver('findMany'),
  accountCount: _account.AccountTC.getResolver('count'),
  accountConnection: _account.AccountTC.getResolver('connection')
};
exports.AccountQuery = AccountQuery;
var AccountMutation = {
  createAccount: _account.AccountTC.getResolver('createAccount'),
  updateOperatingPeriods: _account.AccountTC.getResolver('updateOperatingPeriods'),
  updateAccount: _account.AccountTC.getResolver('updateAccount'),
  updateAccountById: _account.AccountTC.getResolver('updateAccountById'),
  sendEmail: _account.AccountTC.getResolver('sendEmail'),
  uploadFile: _account.AccountTC.getResolver('uploadFile')
};
exports.AccountMutation = AccountMutation;