/* @flow */

import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import { composeWithMongoose } from '../schema/schemaComposer';
import { AddressSchema } from './address';
import { Product } from './product';

export const VenueSchema: Schema<any> = new Schema({
  venueName: {
    type: String,
    required: false,
  },
  venueImage: {
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
  venueAddress: {
    type: AddressSchema,
  },
  tags: {
    type: Array,
    required: false,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
});

export const RequestSchema1: Schema<any> = new Schema({
  type: {
    type: String,
    required: false,
  },
  value: {
    type: String,
    required: false,
  },
});

const Venue = mongoose.model('Venue', VenueSchema);
export const VenueTC = composeWithMongoose<any>(Venue);
export const VenueITC = VenueTC.getInputTypeComposer();

VenueTC.addResolver({
  name: 'venueById',
  type: VenueTC,
  args: { venueId: 'String' },
  resolve: async ({ source, args, context, info }) => {
    var venues = await Venue.find();
    return venues.find((venue) => venue.id == args.venueId);
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

const Request1 = mongoose.model('Request1', RequestSchema1);

export const Request1TC = composeWithMongoose<any>(Request1);
export const RequestI1TC = Request1TC.getInputTypeComposer();

VenueTC.addResolver({
  name: 'filterVenues',
  type: [VenueTC],
  args: { input: [RequestI1TC] },
  resolve: async ({ source, args, context, info }) => {
    var data = await Venue.find();
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
            Number(venue.venueAddress.latitude),
            Number(venue.venueAddress.longitude),
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
        (args) => args.type === 'activityType'
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
      let cityFilter = args.input.find((args) => args.type === 'city');
      if (cityFilter != undefined && cityFilter != null) {
        var cityData = [];
        cityData = data.filter(
          (item) => item.venueAddress.city === cityFilter.value
        );
        cityData.forEach((element) => {
          filteredData.push(element);
        });
      }
    }

    //zip

    let zipFilter = args.input.find((args) => args.type === 'zip');
    if (zipFilter != undefined && zipFilter != null) {
      var zipData = [];
      zipData = data.filter(
        (item) => item.venueAddress.zip === Number(zipFilter.value)
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
      var product = products.find((item) => item.id === productFilter.value);
      productData = data.filter((item) => item.id === product.venueId);
      productData.forEach((element) => {
        filteredData.push(element);
      });
    }

    var venueTypeFilterList = args.input.filter(
      (args) => args.type === 'venueType'
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

      filteredData = filteredData.filter((item) =>
        venueTypeFilter.includes(item.venueType)
      );
    }

    let tagsData = [];

    let tagsFilterList = args.input.filter((args) => args.type === 'tags');
    if (
      tagsFilterList != undefined &&
      tagsFilterList != null &&
      tagsFilterList.length > 0
    ) {
      let tagsFilter = [];
      tagsFilterList.forEach((element) => {
        tagsFilter.push(element);
      });

      if (venueTypeData != undefined && venueTypeData.length > 0) {
        for (let index = 0; index < venueTypeData.length; index++) {
          var tags = venueTypeData[index].tags;
          for (let i = 0; i < tagsFilter.length; i++) {
            var items = venueTypeData.filter((agrs) =>
              agrs.tags.includes(tagsFilter[i].value)
            );
            items.forEach((element) => {
              tagsData.push(element);
            });
          }
        }
      } else {
        let tags = [];
        for (let index = 0; index < data.length; index++) {
          tags = data[index].tags;

          for (let i = 0; i < tagsFilter.length; i++) {
            var items = filteredData.filter((agrs) =>
              agrs.tags.includes(tagsFilter[i].value)
            );
            items.forEach((element) => {
              tagsData.push(element);
            });
          }
        }
      }
      filteredData = tagsData;
    }

    return uniq_fast(filteredData);
  },
});
