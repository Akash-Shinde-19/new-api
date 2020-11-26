/* @flow */
import { LookupTC } from '../models/lookup';

export const LookupQuery = {
  lookupById: LookupTC.getResolver('lookupById'),
  lookupByType: LookupTC.getResolver('lookupByType'),
  getAllLookups: LookupTC.getResolver('getAllLookups'),
  lookupOne: LookupTC.getResolver('findOne'),
  lookups: LookupTC.getResolver('findMany'),
  lookupCount: LookupTC.getResolver('count'),
  lookupConnection: LookupTC.getResolver('connection'),
};

export const LookupMutation = {
  createLookup: LookupTC.getResolver('createLookup'),
  updateLookup: LookupTC.getResolver('updateLookup'),
};
