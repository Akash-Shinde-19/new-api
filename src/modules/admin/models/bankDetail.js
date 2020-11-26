/* @flow */
import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import { composeWithMongoose } from '../schema/schemaComposer';

export const BankDetailSchema: Schema<any> = new Schema(
  {
    routingNumber: {
      type: Number,
      required: true,
    },
    accountNumber: {
      type: Number,
      required: true,
    },
    bankAccountType: {
      type: String,
      required: true,
    },
    nameOnCheck: {
      type: String,
      required: false,
    },
    checkTextOne: {
      type: String,
      required: false,
    },
    checkTextTwo: {
      type: String,
      required: false,
    },
    checkAmount: {
      type: Number,
      required: false,
    },
  },
  {
    collection: 'bankdetails',
  }
);

// export const BankDetail = mongoose.model('BankDetail', BankDetailSchema);
// export const BankDetailTC = composeWithMongoose<any>(BankDetail);
// BankDetailTC.addResolver({
//   name:'bankDetailById',
//   type:BankDetailTC,
//   args:{bankDetailId:'String'},
//   resolve : async ({ source, args, context, info }) => {
//     return await BankDetail.findOne({bankDetailId:args.bankDetailId});
//   }
// });
