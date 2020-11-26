"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductITC = exports.ProductTC = exports.Product = exports.ProuctSchema = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _schemaComposer = require("../schema/schemaComposer");

var _graphqlCompose = require("graphql-compose");

var _basePrice = require("./basePrice");

var _priceDetail = require("./priceDetail");

var _account = require("./account");

var _file = require("./file");

var _apolloUploadServer = require("apollo-upload-server");

var _fs = require("fs");

var _salesAccess = require("./salesAccess");

var _tax = require("./tax");

var _fee = require("./fee");

var _S3Service = require("../utils/S3Service");

var _venue = require("./venue");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var ProuctSchema = new _mongoose.Schema({
  accountId: {
    type: String,
    required: true
  },
  venueId: {
    type: String,
    required: true
  },
  categoryId: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: false
  },
  isActive: {
    type: Boolean,
    required: false
  },
  startDate: {
    type: Date,
    required: false
  },
  endDate: {
    type: Date,
    required: false
  },
  name: {
    type: String,
    required: false
  },
  activityType: {
    type: [String],
    required: false
  },
  shortDescription: {
    type: String,
    required: false
  },
  longDescription: {
    type: String,
    required: false
  },
  advanceSaleEndDate: {
    type: Date,
    required: false
  },
  termsAndConditions: {
    type: String,
    required: false
  },
  step: {
    type: Number,
    required: false
  },
  expireDays: {
    type: Number,
    required: false
  },
  advanceSaleDays: {
    type: Number,
    required: false
  },
  maxVisit: {
    type: Number,
    required: false
  },
  salesChannels: {
    type: Array,
    required: false
  },
  basePricing: [_basePrice.BasePriceSchema],
  priceByPeriod: {
    type: Boolean,
    required: false
  },
  priceByDay: {
    type: Boolean,
    required: false
  },
  priceByDayPart: {
    type: Boolean,
    required: false
  },
  directCommission: {
    type: Number,
    required: false
  },
  partnerCommission: {
    type: Number,
    required: false
  },
  account: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'account'
  },
  pricingDetails: [_priceDetail.PriceDetailSchema],
  file: {
    type: [_file.FileSchema]
  },
  salesAccess: {
    type: _salesAccess.SalesAccessSchema,
    required: false
  },
  taxes: {
    type: [_tax.TaxSchema],
    required: false
  },
  fees: {
    type: [_fee.FeeSchema],
    required: false
  },
  venue: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'venue'
  }
}, {
  collection: 'products',
  timestamps: true
});
exports.ProuctSchema = ProuctSchema;

var Product = _mongoose["default"].model('Product', ProuctSchema);

exports.Product = Product;
var ProductTC = (0, _schemaComposer.composeWithMongoose)(Product);
exports.ProductTC = ProductTC;
var ProductITC = ProductTC.getITC();
exports.ProductITC = ProductITC;
ProductTC.addResolver({
  name: 'saveProduct',
  type: ProductTC,
  args: {
    product: ProductITC,
    file: [_apolloUploadServer.GraphQLUpload]
  },
  resolve: function () {
    var _resolve = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
      var source, args, context, info, productInput, prod, _product, id, name, index, upload, productWithFile;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              source = _ref.source, args = _ref.args, context = _ref.context, info = _ref.info;
              productInput = _objectSpread({}, args.product);
              prod = {};

              if (!(productInput._id != null & productInput._id != undefined)) {
                _context.next = 12;
                break;
              }

              _context.next = 6;
              return Product.findOne({
                _id: productInput._id
              });

            case 6:
              _product = _context.sent;
              _context.next = 9;
              return _product.updateOne(productInput);

            case 9:
              prod = _product;
              _context.next = 15;
              break;

            case 12:
              _context.next = 14;
              return Product.create(productInput);

            case 14:
              prod = _context.sent;

            case 15:
              if (!(args.file != null && args.file != undefined && args.file.length > 0)) {
                _context.next = 32;
                break;
              }

              console.log('file path =' + args.file[0]);
              id = prod._id;
              name = prod.name; // mkdir(`images/${id}_${name}/`, { recursive: true }, (err) => {
              //   if (err) throw err;
              // });

              prod.file = [];
              index = 0;

            case 21:
              if (!(index < args.file.length)) {
                _context.next = 29;
                break;
              }

              _context.next = 24;
              return (0, _S3Service.uploadToS3)(args.file[index], id);

            case 24:
              upload = _context.sent;
              prod.file.push(upload);

            case 26:
              index++;
              _context.next = 21;
              break;

            case 29:
              _context.next = 31;
              return Product.updateOne({
                _id: id
              }, {
                file: prod.file
              });

            case 31:
              productWithFile = _context.sent;

            case 32:
              return _context.abrupt("return", prod);

            case 33:
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
ProductTC.addResolver({
  name: 'updateProduct',
  type: ProductTC,
  args: {
    product: ProductITC,
    file: [_apolloUploadServer.GraphQLUpload]
  },
  resolve: function () {
    var _resolve2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref2) {
      var source, args, context, info, productInput, prod, res, id, name, index, upload, productWithFile;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              source = _ref2.source, args = _ref2.args, context = _ref2.context, info = _ref2.info;
              productInput = _objectSpread({}, args.product);
              _context2.next = 4;
              return Product.findById(productInput._id);

            case 4:
              prod = _context2.sent;

              if (!prod) {
                _context2.next = 26;
                break;
              }

              _context2.next = 8;
              return prod.updateOne(productInput);

            case 8:
              res = _context2.sent;

              if (!(args.file && args.file.length > 0)) {
                _context2.next = 26;
                break;
              }

              prod.file = [];
              console.log('file path =' + args.file[0]);
              id = prod._id;
              name = prod.name; // mkdir(`images/${id}_${name}/`, { recursive: true }, (err) => {
              //   if (err) throw err;
              // });

              index = 0;

            case 15:
              if (!(index < args.file.length)) {
                _context2.next = 23;
                break;
              }

              _context2.next = 18;
              return (0, _S3Service.uploadToS3)(args.file[index], id);

            case 18:
              upload = _context2.sent;
              prod.file.push(upload);

            case 20:
              index++;
              _context2.next = 15;
              break;

            case 23:
              _context2.next = 25;
              return Product.updateOne({
                _id: id
              }, {
                file: prod.file
              });

            case 25:
              productWithFile = _context2.sent;

            case 26:
              return _context2.abrupt("return", prod);

            case 27:
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
ProductTC.addResolver({
  name: 'productById',
  type: ProductTC,
  args: {
    productId: 'String'
  },
  resolve: function () {
    var _resolve3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref3) {
      var source, args, context, info;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              source = _ref3.source, args = _ref3.args, context = _ref3.context, info = _ref3.info;
              _context3.next = 3;
              return Product.findOne({
                _id: args.productId
              });

            case 3:
              return _context3.abrupt("return", _context3.sent);

            case 4:
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
ProductTC.addRelation('account', {
  resolver: function resolver() {
    return _account.AccountTC.getResolver('findOne');
  },
  prepareArgs: {
    filter: function filter(source) {
      return {
        _id: source.accountId
      };
    },
    skip: null,
    sort: null
  },
  projection: {
    account: true
  }
});
ProductTC.addRelation('venue', {
  resolver: function resolver() {
    return _venue.VenueTC.getResolver('findOne');
  },
  prepareArgs: {
    filter: function filter(source) {
      return {
        venueId: source.venueId
      };
    },
    skip: null,
    sort: null
  },
  projection: {
    venue: true
  }
});