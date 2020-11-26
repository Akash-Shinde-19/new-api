/* @flow */
import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import { composeWithMongoose } from '../schema/schemaComposer';
export const AddressSchema: Schema<any> = new Schema(
  {
    addressOne: {
      type: String,
      required: true,
    },
    addressTwo: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
    stateId: {
      type: String,
      required: true,
    },
    zip: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    latitude: {
      type: Number,
      required: false,
    },
    longitude: {
      type: Number,
      required: false,
    },
    isSameAddress: {
      type: Boolean,
      required: false,
    },
  },
  {
    collection: 'address',
  }
);
// export const Address = mongoose.model('Address', AddressSchema);
// export const AddressTC = composeWithMongoose<any>(Address);
// AddressTC.addResolver({
//   name:'addressById',
//   type:AddressTC,
//   args:{addressId:'String'},
//   resolve : async ({ source, args, context, info }) => {
//     return await Address.findOne({addressId:args.addressId});
//   }
// });
