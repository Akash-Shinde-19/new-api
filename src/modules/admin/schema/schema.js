/* @flow */
import { schemaComposer } from './schemaComposer';
import { UserQuery, user, UserMutation } from './userSchema';
import { AccountQuery, AccountMutation } from './accountSchema';
import { GraphQLUpload } from 'apollo-upload-server';
import { ProductMutation, ProductQuery } from './productSchema';
import { MarketQuery, MarketMutation } from './marketSchema';
import { CityQuery, CityMutation } from './citySchema';
import { LookupQuery, LookupMutation } from './lookupSchema';
import {
  ChangeRequestQuery,
  ChangeRequestMutation,
} from './changeRequestSchema';
import { VenueQuery } from './venueSchema';
import { OrderQuery, OrderMutation } from './orderSchema';
import { EventQuery, EventMutation } from './eventSchema';
import { ImageQuery, ImageMutation } from './imageSchema';

schemaComposer.add(GraphQLUpload);
schemaComposer.Query.addFields({
  ...UserQuery,
  ...AccountQuery,
  ...ProductQuery,
  ...MarketQuery,
  ...CityQuery,
  ...LookupQuery,
  ...ChangeRequestQuery,
  ...VenueQuery,
  ...OrderQuery,
  ...EventQuery,
  ...ImageQuery,
});
schemaComposer.Mutation.addFields({
  ...UserMutation,
  ...AccountMutation,
  ...ProductMutation,
  ...MarketMutation,
  ...CityMutation,
  ...LookupMutation,
  ...ChangeRequestMutation,
  ...OrderMutation,
  ...EventMutation,
  ...ImageMutation,
});

export const schema = schemaComposer.buildSchema();
