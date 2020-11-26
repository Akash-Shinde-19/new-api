"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orderFilterInput = exports.OrderITC = exports.OrderTC = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _schemaComposer = require("../schema/schemaComposer");

var _graphqlCompose = require("graphql-compose");

var _orderProduct = require("./orderProduct");

var _guestInformation = require("./guestInformation");

var _orderPayment = require("./orderPayment");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var OrderSchema = new _mongoose.Schema({
  guestInformation: {
    type: _guestInformation.GuestInformationSchema,
    required: false
  },
  orderProducts: {
    type: [_orderProduct.OrderProductSchema],
    required: false
  },
  orderPayments: {
    type: [_orderPayment.OrderPaymentSchema],
    required: false
  },
  orderStatus: {
    //Pending
    type: String,
    required: false
  },
  orderType: {
    //"General Sale";
    type: String,
    required: false
  },
  subTotal: {
    type: Number,
    required: false
  },
  salesTax: {
    type: Number,
    required: false
  },
  salesFee: {
    type: Number,
    required: false
  },
  salesTotal: {
    type: Number,
    required: false
  },
  venueId: {
    type: String,
    required: false
  }
}, {
  collection: 'orders',
  timestamps: true
});
var Order = (0, _mongoose.model)('Order', OrderSchema);
var OrderTC = (0, _schemaComposer.composeWithMongoose)(Order);
exports.OrderTC = OrderTC;
var OrderITC = OrderTC.getInputTypeComposer();
exports.OrderITC = OrderITC;
OrderTC.addResolver({
  name: 'orderById',
  type: OrderTC,
  args: {
    _id: 'String'
  },
  resolve: function () {
    var _resolve = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
      var source, args, context, info;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              source = _ref.source, args = _ref.args, context = _ref.context, info = _ref.info;
              _context.next = 3;
              return Order.findOne({
                _id: args._id
              });

            case 3:
              return _context.abrupt("return", _context.sent);

            case 4:
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

var orderFilterInput = _graphqlCompose.schemaComposer.createObjectTC({
  name: 'OrderFilter',
  fields: {
    lastName: 'String',
    cardLast4: 'String',
    barcode: 'String',
    confirmation: 'String',
    orderId: 'String',
    orderType: 'String',
    orderStatus: 'String',
    startDate: 'String',
    endDate: 'String'
  }
});

exports.orderFilterInput = orderFilterInput;
OrderTC.addResolver({
  name: 'orderByFilter',
  type: [OrderTC],
  args: {
    filter: (0, _graphqlCompose.toInputObjectType)(orderFilterInput)
  },
  resolve: function () {
    var _resolve2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref2) {
      var source, args, context, info, filter, _order;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              source = _ref2.source, args = _ref2.args, context = _ref2.context, info = _ref2.info;
              filter = {};

              if (args.filter.startDate && args.filter.startDate !== 'Invalid Date' && args.filter.endDate && args.filter.endDate !== 'Invalid Date') {
                filter.createdAt = {
                  $gte: new Date(args.filter.startDate),
                  $lte: new Date(args.filter.endDate)
                };
              }

              if (args.filter.lastName && args.filter.lastName.length > 0) {
                filter['guestInformation.lastName'] = {
                  $regex: '.*' + args.filter.lastName + '.*',
                  $options: 'i'
                };
              }

              if (args.filter.cardLast4 && args.filter.cardLast4.length > 0) {
                filter['orderPayments.creditCardLastFour'] = args.filter.cardLast4;
              }

              if (args.filter.orderId && args.filter.orderId.length > 0) {
                filter._id = args.filter.orderId;
              }

              if (args.filter.barcode && args.filter.barcode.length > 0) {
                filter['orderProducts.barcode'] = args.filter.barcode;
              }

              if (args.filter.orderType && args.filter.orderType.length > 0) {
                filter.orderType = args.filter.orderType;
              }

              if (args.filter.orderStatus && args.filter.orderStatus.length > 0) {
                filter.orderStatus = args.filter.orderStatus;
              }

              _context2.next = 11;
              return Order.find(_objectSpread({}, filter)).sort({
                _id: -1
              });

            case 11:
              _order = _context2.sent;
              return _context2.abrupt("return", _order);

            case 13:
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
OrderTC.addResolver({
  name: 'orderByBarcode',
  type: [OrderTC],
  args: {
    barcodes: ['String'],
    products: ['String']
  },
  resolve: function () {
    var _resolve3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref3) {
      var source, args, context, info, barcodes, products, filter, _order;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              source = _ref3.source, args = _ref3.args, context = _ref3.context, info = _ref3.info;
              barcodes = args.barcodes;
              products = args.products;
              filter = {};
              filter['orderProducts.barcode'] = {
                $in: barcodes
              };

              if (args.products && args.products.length > 0) {
                filter['orderProducts.productId'] = {
                  $in: products
                };
              }

              _context3.next = 8;
              return Order.find(_objectSpread({}, filter)).sort({
                _id: -1
              });

            case 8:
              _order = _context3.sent;
              return _context3.abrupt("return", _order);

            case 10:
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

var redeem = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(orderId, barcodes, products) {
    var agent,
        device,
        redeemedBarcodes,
        _order,
        filter,
        orderProducts,
        order,
        _args4 = arguments;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            agent = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : null;
            device = _args4.length > 4 && _args4[4] !== undefined ? _args4[4] : null;
            redeemedBarcodes = [];
            filter = {};

            if (products && products.length > 0) {
              filter['orderProducts.productId'] = {
                $in: products
              };
            }

            if (!orderId) {
              _context4.next = 13;
              break;
            }

            filter._id = orderId;
            filter.orderStatus = "Confirmed";
            _context4.next = 10;
            return Order.findOne(_objectSpread({}, filter)).sort({
              _id: -1
            });

          case 10:
            _order = _context4.sent;
            _context4.next = 20;
            break;

          case 13:
            filter.orderStatus = "Confirmed";
            filter['orderProducts.barcode'] = barcodes[0];
            filter['orderProducts.orderProductStatus'] = "Open"; //filter['orderProducts.redemptionDetail.validStatus'] = "Unused";

            filter['orderProducts.redemptionDetail.usesRemaining'] = {
              $gt: 0
            };
            _context4.next = 19;
            return Order.findOne(_objectSpread({}, filter)).sort({
              _id: -1
            });

          case 19:
            _order = _context4.sent;

          case 20:
            if (!_order) {
              _context4.next = 26;
              break;
            }

            orderProducts = [];

            _order.orderProducts.forEach(function (op) {
              if (barcodes.includes(op.barcode.toString()) && op.orderProductStatus === "Open" && ["Unused", "Used"].includes(op.redemptionDetail.validStatus) && op.redemptionDetail.usesRemaining > 0) {
                op.redemptionDetail.usesRemaining = op.redemptionDetail.usesRemaining - 1;
                op.redemptionDetail.validStatus = "Used";

                if (op.redemptionDetail.usesRemaining === 0) {
                  op.orderProductStatus = "Used";
                }

                var redemptions = {
                  date: new Date() + "",
                  agent: agent,
                  device: device
                };
                op.redemptionDetail.redemptions.push(redemptions);
                redeemedBarcodes.push(op.barcode);
              }

              orderProducts.push(op);
            });

            _context4.next = 25;
            return _order.updateOne({
              orderProducts: orderProducts
            });

          case 25:
            order = _context4.sent;

          case 26:
            return _context4.abrupt("return", redeemedBarcodes);

          case 27:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function redeem(_x4, _x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

OrderTC.addResolver({
  name: 'redeemTickets',
  type: ['String'],
  args: {
    orderId: 'String',
    barcodes: ['String'],
    products: ['String'],
    agent: 'String',
    device: 'String'
  },
  resolve: function () {
    var _resolve4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_ref5) {
      var source, args, context, info, orderId, barcodes, products, redeemedBarcodes, result, i;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              source = _ref5.source, args = _ref5.args, context = _ref5.context, info = _ref5.info;
              orderId = args.orderId;
              barcodes = args.barcodes;
              products = args.products;
              redeemedBarcodes = [];

              if (!orderId) {
                _context5.next = 12;
                break;
              }

              _context5.next = 8;
              return redeem(orderId, barcodes, products, args.agent, args.device);

            case 8:
              result = _context5.sent;
              result.forEach(function (r) {
                redeemedBarcodes.push(r);
              });
              _context5.next = 21;
              break;

            case 12:
              i = 0;

            case 13:
              if (!(i < barcodes.length)) {
                _context5.next = 21;
                break;
              }

              _context5.next = 16;
              return redeem(null, [barcodes[i]], products, args.agent, args.device);

            case 16:
              result = _context5.sent;
              result.forEach(function (r) {
                redeemedBarcodes.push(r);
              });

            case 18:
              i++;
              _context5.next = 13;
              break;

            case 21:
              return _context5.abrupt("return", redeemedBarcodes);

            case 22:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function resolve(_x7) {
      return _resolve4.apply(this, arguments);
    }

    return resolve;
  }()
});
OrderTC.addResolver({
  name: 'createOrder',
  type: OrderTC,
  args: {
    order: OrderITC
  },
  resolve: function () {
    var _resolve5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(_ref6) {
      var source, args, context, info, order;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              source = _ref6.source, args = _ref6.args, context = _ref6.context, info = _ref6.info;
              _context6.next = 3;
              return Order.create(_objectSpread({}, args.order));

            case 3:
              order = _context6.sent;
              return _context6.abrupt("return", order);

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function resolve(_x8) {
      return _resolve5.apply(this, arguments);
    }

    return resolve;
  }()
});
OrderTC.addResolver({
  name: 'updateOrder',
  type: 'Boolean',
  args: {
    order: OrderITC,
    orderId: 'String'
  },
  resolve: function () {
    var _resolve6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(_ref7) {
      var source, args, context, info, _order, opList, refundedList, payments, taxes, fees, paymentList, order;

      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              source = _ref7.source, args = _ref7.args, context = _ref7.context, info = _ref7.info;
              _context7.next = 3;
              return Order.findOne({
                _id: args.orderId
              });

            case 3:
              _order = _context7.sent;

              if (!_order) {
                _context7.next = 18;
                break;
              }

              opList = [];
              refundedList = [];
              payments = [];
              taxes = [];
              fees = [];
              paymentList = [];

              if (args.order.orderStatus === 'Confirmed') {
                _order.orderProducts.forEach(function (element) {
                  element.orderProductStatus = 'Open';
                  element.redemptionDetail.validStatus = "Unused";

                  if (element.maxVisit && element.maxVisit !== 0) {
                    element.redemptionDetail.usesRemaining = element.maxVisit;
                  } else {
                    element.redemptionDetail.usesRemaining = 1;
                  }

                  opList.push(element);
                });

                args.order.orderPayments[0].amountPaid = _order.salesTotal;
                opList.forEach(function (item) {
                  refundedList.push(item);
                });
                args.order.orderProducts = refundedList;
              }

              if (args.order.orderStatus === 'Refunded') {
                _order.orderProducts.forEach(function (element) {
                  element.orderProductStatus = 'Voided';
                  element.redemptionDetail.validStatus = "Void. Cancelled.";
                  element.redemptionDetail.usesRemaining = 0;
                  opList.push(element);
                });

                _order.orderProducts.forEach(function (element) {
                  var opItem = {};
                  opItem.productId = element.productId;
                  opItem.name = element.name;
                  opItem.productType = element.productType;
                  opItem.barcode = 'R-' + element.barcode;
                  opItem.salesPrice = -Math.abs(element.salesPrice);
                  opItem.itemPrice = -Math.abs(element.itemPrice);
                  opItem.visitDate = element.visitDate;
                  opItem.orderProductStatus = 'Refunded';
                  var tax = {};
                  tax.taxName = element.orderTax.taxName;
                  tax.taxAmount = -Math.abs(element.orderTax.taxAmount);
                  tax.appliedType = element.orderTax.appliedType;
                  opItem.orderTax = tax;
                  var fee = {};
                  fee.feeName = element.orderFees.feeName;
                  fee.feeAmount = -Math.abs(element.orderFees.feeAmount);
                  fee.appliedType = element.orderFees.appliedType;
                  opItem.orderFees = fee;
                  var redemptionDetail = {};
                  redemptionDetail.redemptions = element.redemptionDetail.redemptions;
                  redemptionDetail.validStatus = "Void. Refunded";
                  redemptionDetail.usesRemaining = 0;
                  opItem.redemptionDetail = redemptionDetail;
                  refundedList.push(opItem);
                });

                _order.orderPayments.forEach(function (element) {
                  var payment = {};
                  payment.transactionType = 'Refund';
                  payment.paymentType = element.paymentType;
                  payment.cardHolderName = element.cardHolderName;
                  payment.creditCardLastFour = element.creditCardLastFour;
                  payment.amountPaid = -Math.abs(element.amountPaid);
                  payments.push(payment);
                  paymentList.push(element);
                });

                opList.forEach(function (item) {
                  refundedList.push(item);
                });
                paymentList.forEach(function (item) {
                  payments.push(item);
                });
                args.order.orderProducts = refundedList;
                args.order.orderTaxes = taxes;
                args.order.orderPayments = payments;
              }

              _context7.next = 15;
              return _order.updateOne(_objectSpread({}, args.order));

            case 15:
              order = _context7.sent;
              _context7.next = 19;
              break;

            case 18:
              return _context7.abrupt("return", new Error('Order does not exists'));

            case 19:
              return _context7.abrupt("return", true);

            case 20:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    function resolve(_x9) {
      return _resolve6.apply(this, arguments);
    }

    return resolve;
  }()
});
OrderTC.addResolver({
  name: 'partialRefund',
  type: 'Boolean',
  args: {
    order: OrderITC,
    orderId: 'String'
  },
  resolve: function () {
    var _resolve7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(_ref8) {
      var source, args, context, info, _order, opList, refundedList, payments, taxes, fees, paymentList, amountPaid, opId, payment, list, order;

      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              source = _ref8.source, args = _ref8.args, context = _ref8.context, info = _ref8.info;
              _context8.next = 3;
              return Order.findOne({
                _id: args.orderId
              });

            case 3:
              _order = _context8.sent;

              if (!_order) {
                _context8.next = 28;
                break;
              }

              opList = [];
              refundedList = [];
              payments = [];
              taxes = [];
              fees = [];
              paymentList = [];
              amountPaid = 0;
              opId = args.order.orderProducts[0]._id;

              _order.orderProducts.forEach(function (element) {
                if (opId.toString() === element._id.toString()) {
                  element.orderProductStatus = 'Voided';
                  element.redemptionDetail.validStatus = "Void. Cancelled.";
                  element.redemptionDetail.usesRemaining = 0;
                  var opItem = {};
                  opItem.productId = element.productId;
                  opItem.name = element.name;
                  opItem.productType = element.productType;
                  opItem.barcode = 'R-' + element.barcode;
                  opItem.salesPrice = -Math.abs(element.salesPrice);
                  opItem.itemPrice = -Math.abs(element.itemPrice);
                  opItem.visitDate = element.visitDate;
                  opItem.orderProductStatus = 'Refunded';
                  var tax = {};
                  tax.taxName = element.orderTax.taxName;
                  tax.taxAmount = -Math.abs(element.orderTax.taxAmount);
                  tax.appliedType = element.orderTax.appliedType;
                  opItem.orderTax = tax;
                  var fee = {};
                  fee.feeName = element.orderFees.feeName;
                  fee.feeAmount = -Math.abs(element.orderFees.feeAmount);
                  fee.appliedType = element.orderFees.appliedType;
                  opItem.orderFees = fee;
                  amountPaid = element.salesPrice + element.orderTax.taxAmount + element.orderFees.feeAmount;
                  var redemptionDetail = {};
                  redemptionDetail.redemptions = element.redemptionDetail.redemptions;
                  redemptionDetail.validStatus = "Void. Refunded.";
                  redemptionDetail.usesRemaining = 0;
                  opItem.redemptionDetail = redemptionDetail;
                  refundedList.push(opItem);
                }

                opList.push(element);
              });

              opList.forEach(function (item) {
                refundedList.push(item);
              });
              payment = {};

              _order.orderPayments.forEach(function (element) {
                payment.transactionType = 'Refund';
                payment.paymentType = element.paymentType;
                payment.cardHolderName = element.cardHolderName;
                payment.creditCardLastFour = element.creditCardLastFour;
                payment.amountPaid = -Math.abs(amountPaid);
                paymentList.push(element);
              });

              payments.push(payment);
              paymentList.forEach(function (item) {
                payments.push(item);
              });
              args.order.orderProducts = refundedList;
              args.order.orderPayments = payments;
              list = _order.orderProducts.filter(function (args) {
                return args.orderProductStatus === 'Open';
              });

              if (list.length === 0) {
                args.order.orderStatus = 'Refunded';
              }

              _context8.next = 25;
              return _order.updateOne(_objectSpread({}, args.order));

            case 25:
              order = _context8.sent;
              _context8.next = 29;
              break;

            case 28:
              return _context8.abrupt("return", new Error('Order does not exists'));

            case 29:
              return _context8.abrupt("return", true);

            case 30:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    function resolve(_x10) {
      return _resolve7.apply(this, arguments);
    }

    return resolve;
  }()
});