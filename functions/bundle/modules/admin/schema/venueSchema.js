"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VenueQuery = void 0;

var _venue = require("../models/venue");

var VenueQuery = {
  venueById: _venue.VenueTC.getResolver('venueById'),
  filterVenues: _venue.VenueTC.getResolver('filterVenues'),
  venueOne: _venue.VenueTC.getResolver('findOne'),
  venues: _venue.VenueTC.getResolver('findMany'),
  venueCount: _venue.VenueTC.getResolver('count'),
  venueConnection: _venue.VenueTC.getResolver('connection')
};
exports.VenueQuery = VenueQuery;