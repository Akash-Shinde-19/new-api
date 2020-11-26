/* @flow */
import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import { composeWithMongoose } from '../schema/schemaComposer';
import { AddressSchema } from './address';
import { BankDetailSchema } from './bankDetail';
import { OperatingPeriodSchema } from './operatingPeriod';
import { schemaComposer, toInputObjectType } from 'graphql-compose';
import { FileSchema, processUpload, FileTC } from './file';
import { GraphQLUpload } from 'apollo-upload-server';
import { createWriteStream, mkdir } from 'fs';
import sgMail from '@sendgrid/mail';
import { uploadToS3 } from '../utils/S3Service';
import { Product } from './product';
import {Lookup} from './lookup';
export const AccountSchema: Schema<any> = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    accountTypeId: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    venueName: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: false,
    },
    longDescription: {
      type: String,
      required: false,
    },
    termsAndConditions: {
      type: String,
      required: false,
    },
    activityType: {
      type: String,
      required: false,
    },
    venueType: {
      type: String,
      required: false,
    },
    operatingPolicy: {
      type: String,
      required: true,
    },
    brandDetail: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
    isProviderSeller: {
      type: Boolean,
      required: false,
    },
    isSeller: {
      type: Boolean,
      required: false,
    },
    changeType: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    changeRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChangeRequest',
    },
    address: {
      type: AddressSchema,
    },
    addressTwo: {
      type: AddressSchema,
      required: false,
    },
    bankdetail: {
      type: BankDetailSchema,
    },

    operatingPeriods: [OperatingPeriodSchema],
    file: {
      type: [FileSchema],
    },
  },
  {
    collection: 'accounts',
    timestamps: true,
  }
);

export const RequestSchema: Schema<any> = new Schema({
  type: {
    type: String,
    required: false,
  },
  value: {
    type: String,
    required: false,
  },
});
export const Account = mongoose.model('Account', AccountSchema);
export const AccountTC = composeWithMongoose<any>(Account);
export const AccountITC = AccountTC.getITC();

// AccountTC.addRelation('address', {
//   resolver: () => AddressTC.getResolver('findOne'),
//   prepareArgs: {
//     filter: (source) => ({ addressId: source.addressId }),
//     skip: null,
//     sort: null,
//   },
//   projection: { address: true },
// });

//  AccountTC.addRelation('bankdetail', {
//   resolver: () => BankDetailTC.getResolver('findOne'),
//   prepareArgs: {
//     filter: (source) => ({ bankDetailId: source.bankDetailId }),
//     skip: null,
//     sort: null,
//   },
//   projection: { bankdetail: true },
// });
AccountTC.addResolver({
  name: 'uploadFile',
  type: AccountTC,
  args: { accountId: 'String', file: [GraphQLUpload] },
  resolve: async ({ source, args, context, info }) => {
    console.log(args);

    const _account = await Account.findOne({ _id: args.accountId });
    _account.file = [];
    if (args.file.length > 0) {
      console.log(args.files);
      var id = _account._id;
      var name = _account.companyName;

      console.log(id);
      // mkdir(`images/${id}_${name}/`, { recursive: true }, (err) => {
      //   if (err) throw err;
      // });
      let _files = [];
      // const upload = await processUpload(
      //   args.file[0],
      //   `./images/${id}_${name}/`
      // );
      const upload = await uploadToS3(args.file[index], id);
      _account.file.push(upload);
      return _account;
    }
  },
});
AccountTC.addResolver({
  name: 'accountById',
  type: AccountTC,
  args: { accountId: 'String' },
  resolve: async ({ source, args, context, info }) => {
    return await Account.findOne({ _id: args.accountId });
  },
});

AccountTC.addResolver({
  name: 'createAccount',
  type: AccountTC,
  args: {
    account: AccountITC,
    file: [GraphQLUpload],
  },
  resolve: async ({ source, args, context, info }) => {
    console.log(args);
    var accInput = { ...args.account };
    var acc = await Account.create(accInput);
    if (args.file.length > 0) {
      console.log(args.file[0]);
      var id = acc._id;
      var name = acc.companyName;

      console.log(id);
      // mkdir(`images/${id}_${name}/`, { recursive: true }, (err) => {
      //   if (err) throw err;
      // });
      for (let index = 0; index < args.file.length; index++) {
        // const upload = await processUpload(
        //   args.file[index],
        //   `./images/${id}_${name}/`
        // );
        const upload = await uploadToS3(args.file[index], id);
        acc.file.push(upload);
      }
      var accountWithFile = await Account.updateOne(
        { _id: id },
        { file: acc.file }
      );
    }

    return acc;
  },
});

AccountTC.addResolver({
  name: 'updateAccount',
  type: AccountTC,
  args: {
    account: AccountITC,
    file: [GraphQLUpload],
  },
  resolve: async ({ source, args, context, info }) => {
    console.log(args);
    var accInput = { ...args.account };
    const _account = await Account.findOne({ _id: accInput._id });
    if (_account) {
      var acc = await _account.updateOne({ ...args.account });
    }
    if (args.file.length > 0) {
      _account.file = [];
      console.log(args.file[0]);
      var id = _account._id;
      var name = _account.companyName;

      console.log(id);
      // mkdir(`images/${id}_${name}/`, { recursive: true }, (err) => {
      //   if (err) throw err;
      // });
      for (let index = 0; index < args.file.length; index++) {
        // const upload = await processUpload(
        //   args.file[index],
        //   `./images/${id}_${name}/`
        // );
        const upload = await uploadToS3(args.file[index], id);
        _account.file.push(upload);
      }
      var accountWithFile = await Account.updateOne(
        { _id: id },
        { file: _account.file }
      );
    }

    return _account;
  },
});
AccountTC.addResolver({
  name: 'updateOperatingPeriods',
  type: 'Boolean',
  args: { input: AccountITC },
  resolve: async ({ source, args, context, info }) => {
    console.log(args.input.operatingPeriods);
    await Account.updateOne(
      { _id: args.input._id },
      { operatingPeriods: args.input.operatingPeriods }
    );
    return true;
  },
});

AccountTC.addResolver({
  name: 'updateAccountById',
  type: 'Boolean',
  args: { account: AccountITC },
  resolve: async ({ source, args, context, info }) => {
    var accInput = { ...args.account };
    const _account = await Account.findOne({ _id: accInput._id });
    if (_account) {
      var acc = await _account.updateOne({ ...args.account });
    }
    return true;
  },
});
export const emailInput = schemaComposer.createInputTC({
  name: 'emailInput',
  fields: {
    to: 'String',
    text: 'String',
    html: 'String',
  },
});
AccountTC.addResolver({
  name: 'sendEmail',
  type: 'Boolean',
  args: { email: emailInput },
  resolve: async ({ source, args, context, info }) => {
    const email = {
      from: 'noreply@seecity.com',
      subject: 'Regarding request approval',
      ...args.email,
    };
    try {
      sgMail.setApiKey(
        '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'
      );
      const result = await sgMail.send(email);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
    return false;
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

const gis = {
  calculateDistance: function (start, end) {
    var lat1 = parseFloat(start[1]),
      lon1 = parseFloat(start[0]),
      lat2 = parseFloat(end[1]),
      lon2 = parseFloat(end[0]);

    return gis.sphericalCosinus(lat1, lon1, lat2, lon2);
  },

  sphericalCosinus: function (lat1, lon1, lat2, lon2) {
    var radius = 6371e3; // meters
    var dLon = gis.toRad(lon2 - lon1),
      lat1 = gis.toRad(lat1),
      lat2 = gis.toRad(lat2),
      distance =
        Math.acos(
          Math.sin(lat1) * Math.sin(lat2) +
            Math.cos(lat1) * Math.cos(lat2) * Math.cos(dLon)
        ) * radius;

    return distance;
  },

  createCoord: function (coord, bearing, distance) {
    var radius = 6371e3, // meters
      δ = Number(distance) / radius, // angular distance in radians
      θ = gis.toRad(Number(bearing));
    (φ1 = gis.toRad(coord[1])), (λ1 = gis.toRad(coord[0]));

    var φ2 = Math.asin(
      Math.sin(φ1) * Math.cos(δ) + Math.cos(φ1) * Math.sin(δ) * Math.cos(θ)
    );

    var λ2 =
      λ1 +
      Math.atan2(
        Math.sin(θ) * Math.sin(δ) * Math.cos(φ1),
        Math.cos(δ) - Math.sin(φ1) * Math.sin(φ2)
      );
    // normalise to -180..+180°
    λ2 = ((λ2 + 3 * Math.PI) % (2 * Math.PI)) - Math.PI;

    return [gis.toDeg(λ2), gis.toDeg(φ2)];
  },

  getBearing: function (start, end) {
    var startLat = gis.toRad(start[1]),
      startLong = gis.toRad(start[0]),
      endLat = gis.toRad(end[1]),
      endLong = gis.toRad(end[0]),
      dLong = endLong - startLong;

    var dPhi = Math.log(
      Math.tan(endLat / 2.0 + Math.PI / 4.0) /
        Math.tan(startLat / 2.0 + Math.PI / 4.0)
    );

    if (Math.abs(dLong) > Math.PI) {
      dLong = dLong > 0.0 ? -(2.0 * Math.PI - dLong) : 2.0 * Math.PI + dLong;
    }

    return (gis.toDeg(Math.atan2(dLong, dPhi)) + 360.0) % 360.0;
  },
  toDeg: function (n) {
    return (n * 180) / Math.PI;
  },
  toRad: function (n) {
    return (n * Math.PI) / 180;
  },
};

const Request = mongoose.model('Request', RequestSchema);

export const RequestTC = composeWithMongoose<any>(Request);
export const RequestITC = RequestTC.getInputTypeComposer();

AccountTC.addResolver({
  name: 'filterAccounts',
  type: [AccountTC],
  args: { input: [RequestITC] },
  resolve: async ({ source, args, context, info }) => {
    var data = await Account.find();
    let filteredData = [];
    let testData = [];
    let activityTypeValue, venueTypeValue, cityValue, zipValue, venueNameValue;

    if (args.input.length > 0) {
      var lat = args.input.find((args) => args.type === 'lat');
      var long = args.input.find((args) => args.type === 'long');
      if (
        lat != undefined &&
        lat != null &&
        long != undefined &&
        long != null
      ) {
        let latlongData = [];

        for (let index = 0; index < data.length; index++) {
          var venue = data[index];

          var start = [
            Number(venue.address.latitude),
            Number(venue.address.longitude),
          ];
          var end = [Number(lat.value), Number(long.value)];
          let mileType = args.input.find((args) => args.type === 'mile');

          let total_distance = gis.calculateDistance(start, end); // meters
          let miles = 25; // check for 25 miles
          if (mileType != undefined && mileType != null) {
            miles = mileType.value;
          }
          let distance = total_distance * 0.00062137119; // into miles
          console.log('distance   = ' + distance);

          if (distance <= miles) {
            console.log('distance   = ' + distance);

            latlongData.push(venue);
          }
        }
        filteredData = latlongData;
      }
      var activityFilterList = args.input.filter(
        (args) => args.type === 'ActivityTypes'
      );

      // activity type
      let activityFilterArr = [];
      let activityData = [];
      if (
        activityFilterList != undefined &&
        activityFilterList != null &&
        activityFilterList.length > 0
      ) {
        activityFilterList.forEach((element) => {
          activityFilterArr.push(element.value);
        });

        activityData = data.filter((item) =>
          activityFilterArr.includes(item.activityType)
        );
        activityData.forEach((element) => {
          filteredData.push(element);
        });
      }
      // city
      let cityFilter = args.input.find((args) => args.type === 'Cities');
      if (cityFilter != undefined && cityFilter != null) {
        var cityData = [];
        cityData = data.filter(
          (item) => item.address.city === cityFilter.value
        );
        cityData.forEach((element) => {
          filteredData.push(element);
        });
      }
      //venue
      let venueFilter = args.input.find((args) => args.type === 'venue');
      if (venueFilter != undefined && venueFilter != null) {
        var venueData = [];
        venueData = data.filter(
          (item) => item.venueName === venueFilter.value
        );
        venueData.forEach((element) => {
          filteredData.push(element);
        });
      }
    }

    //zip

    let zipFilter = args.input.find((args) => args.type === 'zip');
    if (zipFilter != undefined && zipFilter != null) {
      var zipData = [];
      zipData = data.filter(
        (item) => item.address.zip === Number(zipFilter.value)
      );
      zipData.forEach((element) => {
        filteredData.push(element);
      });
    }

    //product
    let productFilter = args.input.find((args) => args.type === 'product');
    if (productFilter != undefined && productFilter != null) {
      var productData = [];
      var products = await Product.find();
      var product = products.find((item) => item.name === productFilter.value);
      console.log(product);
      if(product)
      {
      productData = data.filter((item) => item.id === product.accountId);
      productData.forEach((element) => {
        filteredData.push(element);
      });
    }
    }

    var venueTypeFilterList = args.input.filter(
      (args) => args.type === 'Account Tags'
    );

    let venueTypeFilter = [];
    let venueTypeData = [];
    if (
      venueTypeFilterList != undefined &&
      venueTypeFilterList != null &&
      venueTypeFilterList.length > 0
    ) {
      venueTypeFilterList.forEach((element) => {
        venueTypeFilter.push(element.value);
      });

      let vdata = data.filter((item) =>
        venueTypeFilter.includes(item.venueType)
      );
      vdata.forEach(v=>filteredData.push(v));
    }

    let tagsData = [];

    let tagsFilterList = args.input.filter(
      (args) => args.type === 'Business Tags'
    );
    if (
      tagsFilterList != undefined &&
      tagsFilterList != null &&
      tagsFilterList.length > 0
    ) {
      
      let tagsFilter = [];
      let tv=(await Lookup.findOne({ type:'Business Tags'}));
   
      tagsFilterList.forEach((element) => {
       tagsFilter.push(tv.values.filter(t=>t.name===element.value));
      });
console.log("tagf",tagsFilter);

if (tagsFilter != undefined && tagsFilter.length > 0){
  for (let index = 0; index < tagsFilter.length; index++) {
    console.log("value at index" ,index,tagsFilter[index][0].value)
    data.forEach(element => {
    console.log("at index",index,element.tags);
    
    if(element.tags.includes(tagsFilter[index].value))
    {
      console.log(element)
    }
  });
    var d=data.filter(d=>d.tags.includes(tagsFilter[index][0].value));
    console.log("d",d);
    d.forEach(element => {
      filteredData.push(element)
    });
        }
      } 
    }

    return uniq_fast(filteredData);
  },
});
