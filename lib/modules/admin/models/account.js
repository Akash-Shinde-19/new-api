"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequestITC = exports.RequestTC = exports.emailInput = exports.AccountITC = exports.AccountTC = exports.Account = exports.RequestSchema = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _schemaComposer = require("../schema/schemaComposer");

var _address = require("./address");

var _bankDetail = require("./bankDetail");

var _operatingPeriod = require("./operatingPeriod");

var _graphqlCompose = require("graphql-compose");

var _file = require("./file");

var _apolloUploadServer = require("apollo-upload-server");

var _fs = require("fs");

var _mail = _interopRequireDefault(require("@sendgrid/mail"));

var _S3Service = require("../utils/S3Service");

var _product = require("./product");

var _lookup = require("./lookup");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var AccountSchema = new _mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  accountTypeId: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  venueName: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: false
  },
  longDescription: {
    type: String,
    required: false
  },
  termsAndConditions: {
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
  operatingPolicy: {
    type: String,
    required: true
  },
  brandDetail: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: true
  },
  isProviderSeller: {
    type: Boolean,
    required: false
  },
  isSeller: {
    type: Boolean,
    required: false
  },
  changeType: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  user: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  },
  product: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Product'
  },
  changeRequest: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'ChangeRequest'
  },
  address: {
    type: _address.AddressSchema
  },
  addressTwo: {
    type: _address.AddressSchema,
    required: false
  },
  bankdetail: {
    type: _bankDetail.BankDetailSchema
  },
  operatingPeriods: [_operatingPeriod.OperatingPeriodSchema],
  file: {
    type: [_file.FileSchema]
  }
}, {
  collection: 'accounts',
  timestamps: true
});
var RequestSchema = new _mongoose.Schema({
  type: {
    type: String,
    required: false
  },
  value: {
    type: String,
    required: false
  }
});
exports.RequestSchema = RequestSchema;

var Account = _mongoose["default"].model('Account', AccountSchema);

exports.Account = Account;
var AccountTC = (0, _schemaComposer.composeWithMongoose)(Account);
exports.AccountTC = AccountTC;
var AccountITC = AccountTC.getITC(); // AccountTC.addRelation('address', {
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

exports.AccountITC = AccountITC;
AccountTC.addResolver({
  name: 'uploadFile',
  type: AccountTC,
  args: {
    accountId: 'String',
    file: [_apolloUploadServer.GraphQLUpload]
  },
  resolve: function () {
    var _resolve = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
      var source, args, context, info, _account, id, name, _files, upload;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              source = _ref.source, args = _ref.args, context = _ref.context, info = _ref.info;
              console.log(args);
              _context.next = 4;
              return Account.findOne({
                _id: args.accountId
              });

            case 4:
              _account = _context.sent;
              _account.file = [];

              if (!(args.file.length > 0)) {
                _context.next = 17;
                break;
              }

              console.log(args.files);
              id = _account._id;
              name = _account.companyName;
              console.log(id); // mkdir(`images/${id}_${name}/`, { recursive: true }, (err) => {
              //   if (err) throw err;
              // });

              _files = []; // const upload = await processUpload(
              //   args.file[0],
              //   `./images/${id}_${name}/`
              // );

              _context.next = 14;
              return (0, _S3Service.uploadToS3)(args.file[index], id);

            case 14:
              upload = _context.sent;

              _account.file.push(upload);

              return _context.abrupt("return", _account);

            case 17:
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
AccountTC.addResolver({
  name: 'accountById',
  type: AccountTC,
  args: {
    accountId: 'String'
  },
  resolve: function () {
    var _resolve2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref2) {
      var source, args, context, info;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              source = _ref2.source, args = _ref2.args, context = _ref2.context, info = _ref2.info;
              _context2.next = 3;
              return Account.findOne({
                _id: args.accountId
              });

            case 3:
              return _context2.abrupt("return", _context2.sent);

            case 4:
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
AccountTC.addResolver({
  name: 'createAccount',
  type: AccountTC,
  args: {
    account: AccountITC,
    file: [_apolloUploadServer.GraphQLUpload]
  },
  resolve: function () {
    var _resolve3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref3) {
      var source, args, context, info, accInput, acc, id, name, _index, upload, accountWithFile;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              source = _ref3.source, args = _ref3.args, context = _ref3.context, info = _ref3.info;
              console.log(args);
              accInput = _objectSpread({}, args.account);
              _context3.next = 5;
              return Account.create(accInput);

            case 5:
              acc = _context3.sent;

              if (!(args.file.length > 0)) {
                _context3.next = 23;
                break;
              }

              console.log(args.file[0]);
              id = acc._id;
              name = acc.companyName;
              console.log(id); // mkdir(`images/${id}_${name}/`, { recursive: true }, (err) => {
              //   if (err) throw err;
              // });

              _index = 0;

            case 12:
              if (!(_index < args.file.length)) {
                _context3.next = 20;
                break;
              }

              _context3.next = 15;
              return (0, _S3Service.uploadToS3)(args.file[_index], id);

            case 15:
              upload = _context3.sent;
              acc.file.push(upload);

            case 17:
              _index++;
              _context3.next = 12;
              break;

            case 20:
              _context3.next = 22;
              return Account.updateOne({
                _id: id
              }, {
                file: acc.file
              });

            case 22:
              accountWithFile = _context3.sent;

            case 23:
              return _context3.abrupt("return", acc);

            case 24:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function resolve(_x3) {
      return _resolve3.apply(this, arguments);
    }

    return resolve;
  }()
});
AccountTC.addResolver({
  name: 'updateAccount',
  type: AccountTC,
  args: {
    account: AccountITC,
    file: [_apolloUploadServer.GraphQLUpload]
  },
  resolve: function () {
    var _resolve4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref4) {
      var source, args, context, info, accInput, _account, acc, id, name, _index2, upload, accountWithFile;

      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              source = _ref4.source, args = _ref4.args, context = _ref4.context, info = _ref4.info;
              console.log(args);
              accInput = _objectSpread({}, args.account);
              _context4.next = 5;
              return Account.findOne({
                _id: accInput._id
              });

            case 5:
              _account = _context4.sent;

              if (!_account) {
                _context4.next = 10;
                break;
              }

              _context4.next = 9;
              return _account.updateOne(_objectSpread({}, args.account));

            case 9:
              acc = _context4.sent;

            case 10:
              if (!(args.file.length > 0)) {
                _context4.next = 28;
                break;
              }

              _account.file = [];
              console.log(args.file[0]);
              id = _account._id;
              name = _account.companyName;
              console.log(id); // mkdir(`images/${id}_${name}/`, { recursive: true }, (err) => {
              //   if (err) throw err;
              // });

              _index2 = 0;

            case 17:
              if (!(_index2 < args.file.length)) {
                _context4.next = 25;
                break;
              }

              _context4.next = 20;
              return (0, _S3Service.uploadToS3)(args.file[_index2], id);

            case 20:
              upload = _context4.sent;

              _account.file.push(upload);

            case 22:
              _index2++;
              _context4.next = 17;
              break;

            case 25:
              _context4.next = 27;
              return Account.updateOne({
                _id: id
              }, {
                file: _account.file
              });

            case 27:
              accountWithFile = _context4.sent;

            case 28:
              return _context4.abrupt("return", _account);

            case 29:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function resolve(_x4) {
      return _resolve4.apply(this, arguments);
    }

    return resolve;
  }()
});
AccountTC.addResolver({
  name: 'updateOperatingPeriods',
  type: 'Boolean',
  args: {
    input: AccountITC
  },
  resolve: function () {
    var _resolve5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_ref5) {
      var source, args, context, info;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              source = _ref5.source, args = _ref5.args, context = _ref5.context, info = _ref5.info;
              console.log(args.input.operatingPeriods);
              _context5.next = 4;
              return Account.updateOne({
                _id: args.input._id
              }, {
                operatingPeriods: args.input.operatingPeriods
              });

            case 4:
              return _context5.abrupt("return", true);

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function resolve(_x5) {
      return _resolve5.apply(this, arguments);
    }

    return resolve;
  }()
});
AccountTC.addResolver({
  name: 'updateAccountById',
  type: 'Boolean',
  args: {
    account: AccountITC
  },
  resolve: function () {
    var _resolve6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(_ref6) {
      var source, args, context, info, accInput, _account, acc;

      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              source = _ref6.source, args = _ref6.args, context = _ref6.context, info = _ref6.info;
              accInput = _objectSpread({}, args.account);
              _context6.next = 4;
              return Account.findOne({
                _id: accInput._id
              });

            case 4:
              _account = _context6.sent;

              if (!_account) {
                _context6.next = 9;
                break;
              }

              _context6.next = 8;
              return _account.updateOne(_objectSpread({}, args.account));

            case 8:
              acc = _context6.sent;

            case 9:
              return _context6.abrupt("return", true);

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function resolve(_x6) {
      return _resolve6.apply(this, arguments);
    }

    return resolve;
  }()
});

var emailInput = _graphqlCompose.schemaComposer.createInputTC({
  name: 'emailInput',
  fields: {
    to: 'String',
    text: 'String',
    html: 'String'
  }
});

exports.emailInput = emailInput;
AccountTC.addResolver({
  name: 'sendEmail',
  type: 'Boolean',
  args: {
    email: emailInput
  },
  resolve: function () {
    var _resolve7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(_ref7) {
      var source, args, context, info, email, result;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              source = _ref7.source, args = _ref7.args, context = _ref7.context, info = _ref7.info;
              email = _objectSpread({
                from: 'noreply@seecity.com',
                subject: 'Regarding request approval'
              }, args.email);
              _context7.prev = 2;

              _mail["default"].setApiKey('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');

              _context7.next = 6;
              return _mail["default"].send(email);

            case 6:
              result = _context7.sent;
              return _context7.abrupt("return", true);

            case 10:
              _context7.prev = 10;
              _context7.t0 = _context7["catch"](2);
              console.log(_context7.t0);
              return _context7.abrupt("return", false);

            case 14:
              return _context7.abrupt("return", false);

            case 15:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[2, 10]]);
    }));

    function resolve(_x7) {
      return _resolve7.apply(this, arguments);
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

var Request = _mongoose["default"].model('Request', RequestSchema);

var RequestTC = (0, _schemaComposer.composeWithMongoose)(Request);
exports.RequestTC = RequestTC;
var RequestITC = RequestTC.getInputTypeComposer();
exports.RequestITC = RequestITC;
AccountTC.addResolver({
  name: 'filterAccounts',
  type: [AccountTC],
  args: {
    input: [RequestITC]
  },
  resolve: function () {
    var _resolve8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(_ref8) {
      var source, args, context, info, data, filteredData, testData, activityTypeValue, venueTypeValue, cityValue, zipValue, venueNameValue, lat, _long, latlongData, _index3, venue, start, end, mileType, total_distance, miles, distance, activityFilterList, activityFilterArr, activityData, cityFilter, cityData, venueFilter, venueData, zipFilter, zipData, productFilter, productData, products, product, venueTypeFilterList, venueTypeFilter, venueTypeData, vdata, tagsData, tagsFilterList, d;

      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              source = _ref8.source, args = _ref8.args, context = _ref8.context, info = _ref8.info;
              _context9.next = 3;
              return Account.find();

            case 3:
              data = _context9.sent;
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

                  for (_index3 = 0; _index3 < data.length; _index3++) {
                    venue = data[_index3];
                    start = [Number(venue.address.latitude), Number(venue.address.longitude)];
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
                  return args.type === 'ActivityTypes';
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
                  return args.type === 'Cities';
                });

                if (cityFilter != undefined && cityFilter != null) {
                  cityData = [];
                  cityData = data.filter(function (item) {
                    return item.address.city === cityFilter.value;
                  });
                  cityData.forEach(function (element) {
                    filteredData.push(element);
                  });
                } //venue


                venueFilter = args.input.find(function (args) {
                  return args.type === 'venue';
                });

                if (venueFilter != undefined && venueFilter != null) {
                  venueData = [];
                  venueData = data.filter(function (item) {
                    return item.venueName === venueFilter.value;
                  });
                  venueData.forEach(function (element) {
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
                  return item.address.zip === Number(zipFilter.value);
                });
                zipData.forEach(function (element) {
                  filteredData.push(element);
                });
              } //product


              productFilter = args.input.find(function (args) {
                return args.type === 'product';
              });

              if (!(productFilter != undefined && productFilter != null)) {
                _context9.next = 18;
                break;
              }

              productData = [];
              _context9.next = 14;
              return _product.Product.find();

            case 14:
              products = _context9.sent;
              product = products.find(function (item) {
                return item.name === productFilter.value;
              });
              console.log(product);

              if (product) {
                productData = data.filter(function (item) {
                  return item.id === product.accountId;
                });
                productData.forEach(function (element) {
                  filteredData.push(element);
                });
              }

            case 18:
              venueTypeFilterList = args.input.filter(function (args) {
                return args.type === 'Account Tags';
              });
              venueTypeFilter = [];
              venueTypeData = [];

              if (venueTypeFilterList != undefined && venueTypeFilterList != null && venueTypeFilterList.length > 0) {
                venueTypeFilterList.forEach(function (element) {
                  venueTypeFilter.push(element.value);
                });
                vdata = data.filter(function (item) {
                  return venueTypeFilter.includes(item.venueType);
                });
                vdata.forEach(function (v) {
                  return filteredData.push(v);
                });
              }

              tagsData = [];
              tagsFilterList = args.input.filter(function (args) {
                return args.type === 'Business Tags';
              });

              if (!(tagsFilterList != undefined && tagsFilterList != null && tagsFilterList.length > 0)) {
                _context9.next = 26;
                break;
              }

              return _context9.delegateYield( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
                var tagsFilter, tv, _loop, _index4;

                return _regenerator["default"].wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        tagsFilter = [];
                        _context8.next = 3;
                        return _lookup.Lookup.findOne({
                          type: 'Business Tags'
                        });

                      case 3:
                        tv = _context8.sent;
                        tagsFilterList.forEach(function (element) {
                          tagsFilter.push(tv.values.filter(function (t) {
                            return t.name === element.value;
                          }));
                        });
                        console.log("tagf", tagsFilter);

                        if (tagsFilter != undefined && tagsFilter.length > 0) {
                          _loop = function _loop(_index4) {
                            console.log("value at index", _index4, tagsFilter[_index4][0].value);
                            data.forEach(function (element) {
                              console.log("at index", _index4, element.tags);

                              if (element.tags.includes(tagsFilter[_index4].value)) {
                                console.log(element);
                              }
                            });
                            d = data.filter(function (d) {
                              return d.tags.includes(tagsFilter[_index4][0].value);
                            });
                            console.log("d", d);
                            d.forEach(function (element) {
                              filteredData.push(element);
                            });
                          };

                          for (_index4 = 0; _index4 < tagsFilter.length; _index4++) {
                            _loop(_index4);
                          }
                        }

                      case 7:
                      case "end":
                        return _context8.stop();
                    }
                  }
                }, _callee8);
              })(), "t0", 26);

            case 26:
              return _context9.abrupt("return", uniq_fast(filteredData));

            case 27:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    function resolve(_x8) {
      return _resolve8.apply(this, arguments);
    }

    return resolve;
  }()
});