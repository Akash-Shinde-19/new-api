"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddressSchema = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _schemaComposer = require("../schema/schemaComposer");

var AddressSchema = new _mongoose.Schema({
  addressOne: {
    type: String,
    required: true
  },
  addressTwo: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: true
  },
  stateId: {
    type: String,
    required: true
  },
  zip: {
    type: Number,
    required: true
  },
  phoneNumber: {
    type: String,
    required: false
  },
  latitude: {
    type: Number,
    required: false
  },
  longitude: {
    type: Number,
    required: false
  },
  isSameAddress: {
    type: Boolean,
    required: false
  }
}, {
  collection: 'address'
}); // export const Address = mongoose.model('Address', AddressSchema);
// export const AddressTC = composeWithMongoose<any>(Address);
// AddressTC.addResolver({
//   name:'addressById',
//   type:AddressTC,
//   args:{addressId:'String'},
//   resolve : async ({ source, args, context, info }) => {
//     return await Address.findOne({addressId:args.addressId});
//   }
// });

exports.AddressSchema = AddressSchema;