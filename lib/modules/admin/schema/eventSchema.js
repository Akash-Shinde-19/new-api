"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventMutation = exports.EventQuery = void 0;

var _event = require("../models/event");

var EventQuery = {
  eventById: _event.EventTC.getResolver('eventById'),
  eventOne: _event.EventTC.getResolver('findOne'),
  eventMany: _event.EventTC.getResolver('findMany'),
  eventCount: _event.EventTC.getResolver('count'),
  eventConnection: _event.EventTC.getResolver('connection')
};
exports.EventQuery = EventQuery;
var EventMutation = {
  saveEvent: _event.EventTC.getResolver('saveEvent'),
  updateEvent: _event.EventTC.getResolver('updateEvent')
};
exports.EventMutation = EventMutation;