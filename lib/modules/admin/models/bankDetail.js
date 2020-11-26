"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BankDetailSchema = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _schemaComposer = require("../schema/schemaComposer");

var BankDetailSchema = new _mongoose.Schema({
  routingNumber: {
    type: Number,
    required: true
  },
  accountNumber: {
    type: Number,
    required: true
  },
  bankAccountType: {
    type: String,
    required: true
  },
  nameOnCheck: {
    type: String,
    required: false
  },
  checkTextOne: {
    type: String,
    required: false
  },
  checkTextTwo: {
    type: String,
    required: false
  },
  checkAmount: {
    type: Number,
    required: false
  }
}, {
  collection: 'bankdetails'
}); // export const BankDetail = mongoose.model('BankDetail', BankDetailSchema);
// export const BankDetailTC = composeWithMongoose<any>(BankDetail);
// BankDetailTC.addResolver({
//   name:'bankDetailById',
//   type:BankDetailTC,
//   args:{bankDetailId:'String'},
//   resolve : async ({ source, args, context, info }) => {
//     return await BankDetail.findOne({bankDetailId:args.bankDetailId});
//   }
// });

exports.BankDetailSchema = BankDetailSchema;