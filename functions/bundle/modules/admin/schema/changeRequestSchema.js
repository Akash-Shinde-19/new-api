"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeRequestMutation = exports.ChangeRequestQuery = void 0;

var _changeRequest = require("../models/changeRequest");

var ChangeRequestQuery = {
  changeRequestById: _changeRequest.ChangeRequestTC.getResolver('changeRequestById'),
  changeRequestOne: _changeRequest.ChangeRequestTC.getResolver('findOne'),
  changeRequestMany: _changeRequest.ChangeRequestTC.getResolver('findMany'),
  changeRequestCount: _changeRequest.ChangeRequestTC.getResolver('count'),
  changeRequestConnection: _changeRequest.ChangeRequestTC.getResolver('connection')
};
exports.ChangeRequestQuery = ChangeRequestQuery;
var ChangeRequestMutation = {
  saveChangeRequest: _changeRequest.ChangeRequestTC.getResolver('saveChangeRequest')
};
exports.ChangeRequestMutation = ChangeRequestMutation;