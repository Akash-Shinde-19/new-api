/* @flow */
import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import { composeWithMongoose } from '../schema/schemaComposer';
import { schemaComposer, toInputObjectType } from 'graphql-compose';
import { Product } from './product';
import { Account } from './account';

const LookupSchema: Schema<any> = new Schema(
  {
    type: {
      type: String,
      required: true,
      unique: true,
    },
    values: {
      type: [Object],
      required: true,
    },
  },
  {
    collection: 'lookups',
  },
  {
    timestamps: true,
  }
);

const ResponseSchema: Schema<any> = new Schema({
  type: {
    type: String,
    required: false,
  },
  value: {
    type: String,
    required: false,
  },
});

export const Lookup = model('Lookup', LookupSchema);
export const LookupTC = composeWithMongoose<any>(Lookup);
const Response = model('Response', ResponseSchema);
export const ResponseTC = composeWithMongoose<any>(Response);

export const LookupITC = LookupTC.getInputTypeComposer();

LookupTC.addResolver({
  name: 'lookupById',
  type: LookupTC,
  args: { _id: 'String' },
  resolve: async ({ source, args, context, info }) => {
    return await Lookup.findOne({ _id: args._id });
  },
});

LookupTC.addResolver({
  name: 'lookupByType',
  type: LookupTC,
  args: { type: 'String' },
  resolve: async ({ source, args, context, info }) => {
    return await Lookup.findOne({ type: args.type });
  },
});

LookupTC.addResolver({
  name: 'createLookup',
  type: LookupTC,
  args: {
    lookup: LookupITC,
  },
  resolve: async ({ source, args, context, info }) => {
    const lookup = await Lookup.create({ ...args.lookup });
    return lookup;
  },
});
const uniq_fast = (a) => {
  var seen = {};
  var out = [];
  var len = a.length;
  var j = 0;
  for (var i = 0; i < len; i++) {
    var item = a[i];
    if (seen[item] !== 1) {
      seen[item] = 1;
      out[j++] = item;
    }
  }
  return out;
};
LookupTC.addResolver({
  name: 'getAllLookups',
  type: [ResponseTC],
  args: { type: 'String' },
  resolve: async ({ source, args, context, info }) => {
    const data = await Lookup.find();
    let lookUps = [ResponseTC];
    data.filter(e=>e.type==="Cities" || e.type==="ActivityTypes").forEach((element) => {
      if (element.values.length > 0) {
        let values = element.values;
        values.forEach((val) => {
          if (val.name != undefined && val.name != null) {
            var response = {};
            response.type = element.type;
            response.value = val.name;
            lookUps.push(response);
          }
        });
      }
    });
    const accountData = await Account.find();
    const businessTags= data.filter(d=>d.type==="Business Tags");
    accountData.forEach((element) => {
      var response = {};
      response.type = 'venue';
      response.value = element.venueName;
      lookUps.push(response);
     
      if(!lookUps.filter(x=>x.value===element.venueType) || lookUps.filter(x=>x.value===element.venueType).length==0)
      {
      response = {};
      response.type = 'Account Tags';
      response.value = element.venueType;
      lookUps.push(response);
      }
      element.tags.forEach(tagelement => {
       var data=businessTags[0].values.filter(bt=>bt.value===tagelement)
     if(!lookUps.filter(x=>x.value===data[0].name) || lookUps.filter(x=>x.value===data[0].name).length==0)
     {
         response = {};
        response.type = "Business Tags";
        response.value = data[0].name;
        lookUps.push(response);
     }
      });
    });

    const productData = await Product.find();
    productData.forEach((element) => {
      var response = {};
      response.type = 'product';
      response.value = element.name;
      lookUps.push(response);
    });

    return lookUps;
  },
});

LookupTC.addResolver({
  name: 'updateLookup',
  type: 'Boolean',
  args: {
    lookup: LookupITC,
  },
  resolve: async ({ source, args, context, info }) => {
    const _lookup = await Lookup.findOne({ _id: args.lookup._id });
    if (_lookup) {
      const lookup = await _lookup.updateOne({ ...args.lookup });
    } else {
      return new Error('Lookup does not exists');
    }
    return true;
  },
});
