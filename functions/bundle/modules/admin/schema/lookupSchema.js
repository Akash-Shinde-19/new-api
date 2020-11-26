"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LookupMutation = exports.LookupQuery = void 0;

var _lookup = require("../models/lookup");

var LookupQuery = {
  lookupById: _lookup.LookupTC.getResolver('lookupById'),
  lookupByType: _lookup.LookupTC.getResolver('lookupByType'),
  getAllLookups: _lookup.LookupTC.getResolver('getAllLookups'),
  lookupOne: _lookup.LookupTC.getResolver('findOne'),
  lookups: _lookup.LookupTC.getResolver('findMany'),
  lookupCount: _lookup.LookupTC.getResolver('count'),
  lookupConnection: _lookup.LookupTC.getResolver('connection')
};
exports.LookupQuery = LookupQuery;
var LookupMutation = {
  createLookup: _lookup.LookupTC.getResolver('createLookup'),
  updateLookup: _lookup.LookupTC.getResolver('updateLookup')
};
exports.LookupMutation = LookupMutation;