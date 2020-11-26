/* @flow */
import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import { composeWithMongoose } from '../schema/schemaComposer';
import { AccountTC } from './account';
import { ChangeRequestFieldSchema } from './changeRequestField';
export const ChangeRequestSchema: Schema<any> = new Schema(
  {
    accountId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
    },
    subType: {
      type: String,
      required: false,
    },
    fields: [ChangeRequestFieldSchema],
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'account',
    },
  },
  {
    collection: 'change_requests',
  }
);

export const ChangeRequest = mongoose.model(
  'ChangeRequest',
  ChangeRequestSchema
);
export const ChangeRequestTC = composeWithMongoose<any>(ChangeRequest);
export const ChangeRequestITC = ChangeRequestTC.getITC();

ChangeRequestTC.addResolver({
  name: 'changeRequestById',
  type: ChangeRequestTC,
  args: { changeRequestId: 'String' },
  resolve: async ({ source, args, context, info }) => {
    return await ChangeRequest.findOne({ _id: args.changeRequestId });
  },
});
ChangeRequestTC.addResolver({
  name: 'saveChangeRequest',
  type: ChangeRequestTC,
  args: {
    changeRequest: ChangeRequestITC,
  },
  resolve: async ({ source, args, context, info }) => {
    return await ChangeRequest.create({ ...args.changeRequest });
  },
});

ChangeRequestTC.addRelation('account', {
  resolver: () => AccountTC.getResolver('findOne'),
  prepareArgs: {
    filter: (source) => ({ _id: source.accountId }),
    skip: null,
    sort: null,
  },
  projection: { account: true },
});
