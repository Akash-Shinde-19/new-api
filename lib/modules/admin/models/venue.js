"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequestI1TC = exports.Request1TC = exports.VenueITC = exports.VenueTC = exports.RequestSchema1 = exports.VenueSchema = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _schemaComposer = require("../schema/schemaComposer");

var _address = require("./address");

var _product = require("./product");

var VenueSchema = new _mongoose.Schema({
  venueName: {
    type: String,
    required: false
  },
  venueImage: {
    type: String,
    required: false
  },
  activityType: {
    type: String,
    required: false
  },
  venueType: {
    type: String,
    required: false
  },
  venueAddress: {
    type: _address.AddressSchema
  },
  tags: {
    type: Array,
    required: false
  },
  product: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Product'
  }
});
exports.VenueSchema = VenueSchema;
var RequestSchema1 = new _mongoose.Schema({
  type: {
    type: String,
    required: false
  },
  value: {
    type: String,
    required: false
  }
});
exports.RequestSchema1 = RequestSchema1;

var Venue = _mongoose["default"].model('Venue', VenueSchema);

var VenueTC = (0, _schemaComposer.composeWithMongoose)(Venue);
exports.VenueTC = VenueTC;
var VenueITC = VenueTC.getInputTypeComposer();
exports.VenueITC = VenueITC;
VenueTC.addResolver({
  name: 'venueById',
  type: VenueTC,
  args: {
    venueId: 'String'
  },
  resolve: function () {
    var _resolve = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
      var source, args, context, info, venues;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              source = _ref.source, args = _ref.args, context = _ref.context, info = _ref.info;
              _context.next = 3;
              return Venue.find();

            case 3:
              venues = _context.sent;
              return _context.abrupt("return", venues.find(function (venue) {
                return venue.id == args.venueId;
              }));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function resolve(_x) {
      return _resolve.apply(this, arguments);
    }

    return resolve;
  }()
});

var uniq_fast = function uniq_fast(a) {
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

var gis = {
  calculateDistance: function calculateDistance(start, end) {
    var lat1 = parseFloat(start[1]),
        lon1 = parseFloat(start[0]),
        lat2 = parseFloat(end[1]),
        lon2 = parseFloat(end[0]);
    return gis.sphericalCosinus(lat1, lon1, lat2, lon2);
  },
  sphericalCosinus: function sphericalCosinus(lat1, lon1, lat2, lon2) {
    var radius = 6371e3; // meters

    var dLon = gis.toRad(lon2 - lon1),
        lat1 = gis.toRad(lat1),
        lat2 = gis.toRad(lat2),
        distance = Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(dLon)) * radius;
    return distance;
  },
  createCoord: function createCoord(coord, bearing, distance) {
    var radius = 6371e3,
        // meters
    δ = Number(distance) / radius,
        // angular distance in radians
    θ = gis.toRad(Number(bearing));
    φ1 = gis.toRad(coord[1]), λ1 = gis.toRad(coord[0]);
    var φ2 = Math.asin(Math.sin(φ1) * Math.cos(δ) + Math.cos(φ1) * Math.sin(δ) * Math.cos(θ));
    var λ2 = λ1 + Math.atan2(Math.sin(θ) * Math.sin(δ) * Math.cos(φ1), Math.cos(δ) - Math.sin(φ1) * Math.sin(φ2)); // normalise to -180..+180°

    λ2 = (λ2 + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
    return [gis.toDeg(λ2), gis.toDeg(φ2)];
  },
  getBearing: function getBearing(start, end) {
    var startLat = gis.toRad(start[1]),
        startLong = gis.toRad(start[0]),
        endLat = gis.toRad(end[1]),
        endLong = gis.toRad(end[0]),
        dLong = endLong - startLong;
    var dPhi = Math.log(Math.tan(endLat / 2.0 + Math.PI / 4.0) / Math.tan(startLat / 2.0 + Math.PI / 4.0));

    if (Math.abs(dLong) > Math.PI) {
      dLong = dLong > 0.0 ? -(2.0 * Math.PI - dLong) : 2.0 * Math.PI + dLong;
    }

    return (gis.toDeg(Math.atan2(dLong, dPhi)) + 360.0) % 360.0;
  },
  toDeg: function toDeg(n) {
    return n * 180 / Math.PI;
  },
  toRad: function toRad(n) {
    return n * Math.PI / 180;
  }
};

var Request1 = _mongoose["default"].model('Request1', RequestSchema1);

var Request1TC = (0, _schemaComposer.composeWithMongoose)(Request1);
exports.Request1TC = Request1TC;
var RequestI1TC = Request1TC.getInputTypeComposer();
exports.RequestI1TC = RequestI1TC;
VenueTC.addResolver({
  name: 'filterVenues',
  type: [VenueTC],
  args: {
    input: [RequestI1TC]
  },
  resolve: function () {
    var _resolve2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref2) {
      var source, args, context, info, data, filteredData, testData, activityTypeValue, venueTypeValue, cityValue, zipValue, venueNameValue, lat, _long, latlongData, index, venue, start, end, mileType, total_distance, miles, distance, activityFilterList, activityFilterArr, activityData, cityFilter, cityData, zipFilter, zipData, productFilter, productData, products, product, venueTypeFilterList, venueTypeFilter, venueTypeData, tagsData, tagsFilterList, tags, items;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              source = _ref2.source, args = _ref2.args, context = _ref2.context, info = _ref2.info;
              _context2.next = 3;
              return Venue.find();

            case 3:
              data = _context2.sent;
              filteredData = [];
              testData = [];

              if (args.input.length > 0) {
                lat = args.input.find(function (args) {
                  return args.type === 'lat';
                });
                _long = args.input.find(function (args) {
                  return args.type === 'long';
                });

                if (lat != undefined && lat != null && _long != undefined && _long != null) {
                  latlongData = [];

                  for (index = 0; index < data.length; index++) {
                    venue = data[index];
                    start = [Number(venue.venueAddress.latitude), Number(venue.venueAddress.longitude)];
                    end = [Number(lat.value), Number(_long.value)];
                    mileType = args.input.find(function (args) {
                      return args.type === 'mile';
                    });
                    total_distance = gis.calculateDistance(start, end); // meters

                    miles = 25; // check for 25 miles

                    if (mileType != undefined && mileType != null) {
                      miles = mileType.value;
                    }

                    distance = total_distance * 0.00062137119; // into miles

                    console.log('distance   = ' + distance);

                    if (distance <= miles) {
                      console.log('distance   = ' + distance);
                      latlongData.push(venue);
                    }
                  }

                  filteredData = latlongData;
                }

                activityFilterList = args.input.filter(function (args) {
                  return args.type === 'activityType';
                }); // activity type

                activityFilterArr = [];
                activityData = [];

                if (activityFilterList != undefined && activityFilterList != null && activityFilterList.length > 0) {
                  activityFilterList.forEach(function (element) {
                    activityFilterArr.push(element.value);
                  });
                  activityData = data.filter(function (item) {
                    return activityFilterArr.includes(item.activityType);
                  });
                  activityData.forEach(function (element) {
                    filteredData.push(element);
                  });
                } // city


                cityFilter = args.input.find(function (args) {
                  return args.type === 'city';
                });

                if (cityFilter != undefined && cityFilter != null) {
                  cityData = [];
                  cityData = data.filter(function (item) {
                    return item.venueAddress.city === cityFilter.value;
                  });
                  cityData.forEach(function (element) {
                    filteredData.push(element);
                  });
                }
              } //zip


              zipFilter = args.input.find(function (args) {
                return args.type === 'zip';
              });

              if (zipFilter != undefined && zipFilter != null) {
                zipData = [];
                zipData = data.filter(function (item) {
                  return item.venueAddress.zip === Number(zipFilter.value);
                });
                zipData.forEach(function (element) {
                  filteredData.push(element);
                });
              } //product


              productFilter = args.input.find(function (args) {
                return args.type === 'product';
              });

              if (!(productFilter != undefined && productFilter != null)) {
                _context2.next = 18;
                break;
              }

              productData = [];
              _context2.next = 14;
              return _product.Product.find();

            case 14:
              products = _context2.sent;
              product = products.find(function (item) {
                return item.id === productFilter.value;
              });
              productData = data.filter(function (item) {
                return item.id === product.venueId;
              });
              productData.forEach(function (element) {
                filteredData.push(element);
              });

            case 18:
              venueTypeFilterList = args.input.filter(function (args) {
                return args.type === 'venueType';
              });
              venueTypeFilter = [];
              venueTypeData = [];

              if (venueTypeFilterList != undefined && venueTypeFilterList != null && venueTypeFilterList.length > 0) {
                venueTypeFilterList.forEach(function (element) {
                  venueTypeFilter.push(element.value);
                });
                filteredData = filteredData.filter(function (item) {
                  return venueTypeFilter.includes(item.venueType);
                });
              }

              tagsData = [];
              tagsFilterList = args.input.filter(function (args) {
                return args.type === 'tags';
              });

              if (tagsFilterList != undefined && tagsFilterList != null && tagsFilterList.length > 0) {
                (function () {
                  var tagsFilter = [];
                  tagsFilterList.forEach(function (element) {
                    tagsFilter.push(element);
                  });

                  if (venueTypeData != undefined && venueTypeData.length > 0) {
                    for (var _index = 0; _index < venueTypeData.length; _index++) {
                      tags = venueTypeData[_index].tags;

                      var _loop = function _loop(i) {
                        items = venueTypeData.filter(function (agrs) {
                          return agrs.tags.includes(tagsFilter[i].value);
                        });
                        items.forEach(function (element) {
                          tagsData.push(element);
                        });
                      };

                      for (var i = 0; i < tagsFilter.length; i++) {
                        _loop(i);
                      }
                    }
                  } else {
                    var _tags = [];

                    for (var _index2 = 0; _index2 < data.length; _index2++) {
                      _tags = data[_index2].tags;

                      var _loop2 = function _loop2(_i) {
                        items = filteredData.filter(function (agrs) {
                          return agrs.tags.includes(tagsFilter[_i].value);
                        });
                        items.forEach(function (element) {
                          tagsData.push(element);
                        });
                      };

                      for (var _i = 0; _i < tagsFilter.length; _i++) {
                        _loop2(_i);
                      }
                    }
                  }

                  filteredData = tagsData;
                })();
              }

              return _context2.abrupt("return", uniq_fast(filteredData));

            case 26:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function resolve(_x2) {
      return _resolve2.apply(this, arguments);
    }

    return resolve;
  }()
});