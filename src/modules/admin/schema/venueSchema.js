/* @flow */
import { VenueTC } from '../models/venue';

export const VenueQuery = {
  venueById: VenueTC.getResolver('venueById'),
  filterVenues: VenueTC.getResolver('filterVenues'),
  venueOne: VenueTC.getResolver('findOne'),
  venues: VenueTC.getResolver('findMany'),
  venueCount: VenueTC.getResolver('count'),
  venueConnection: VenueTC.getResolver('connection'),
};
