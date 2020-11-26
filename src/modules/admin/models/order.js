/* @flow */
import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import { composeWithMongoose } from '../schema/schemaComposer';
import { schemaComposer, toInputObjectType } from 'graphql-compose';
import { OrderProductSchema } from './orderProduct';
import { GuestInformationSchema } from './guestInformation';
import { OrderPaymentSchema } from './orderPayment';

const OrderSchema: Schema<any> = new Schema(
  {
    guestInformation: {
      type: GuestInformationSchema,
      required: false,
    },
    orderProducts: {
      type: [OrderProductSchema],
      required: false,
    },
    orderPayments: {
      type: [OrderPaymentSchema],
      required: false,
    },

    orderStatus: {
      //Pending
      type: String,
      required: false,
    },
    orderType: {
      //"General Sale";
      type: String,
      required: false,
    },
    subTotal: {
      type: Number,
      required: false,
    },
    salesTax: {
      type: Number,
      required: false,
    },
    salesFee: {
      type: Number,
      required: false,
    },
    salesTotal: {
      type: Number,
      required: false,
    },
    venueId: {
      type: String,
      required: false,
    },
  },
  {
    collection: 'orders',
    timestamps: true,
  }
);

const Order = model('Order', OrderSchema);
export const OrderTC = composeWithMongoose<any>(Order);
export const OrderITC = OrderTC.getInputTypeComposer();

OrderTC.addResolver({
  name: 'orderById',
  type: OrderTC,
  args: { _id: 'String' },
  resolve: async ({ source, args, context, info }) => {
    return await Order.findOne({ _id: args._id });
  },
});

export const orderFilterInput = schemaComposer.createObjectTC({
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
    endDate: 'String',
  },
});

OrderTC.addResolver({
  name: 'orderByFilter',
  type: [OrderTC],
  args: { filter: toInputObjectType(orderFilterInput) },
  resolve: async ({ source, args, context, info }) => {
    var filter = {};
    if (
      args.filter.startDate &&
      args.filter.startDate !== 'Invalid Date' &&
      args.filter.endDate &&
      args.filter.endDate !== 'Invalid Date'
    ) {
      filter.createdAt = {
        $gte: new Date(args.filter.startDate),
        $lte: new Date(args.filter.endDate),
      };
    }
    if (args.filter.lastName && args.filter.lastName.length > 0) {
      filter['guestInformation.lastName'] = {
        $regex: '.*' + args.filter.lastName + '.*',
        $options: 'i',
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
    const _order = await Order.find({
      ...filter,
    }).sort({ _id: -1 });
    return _order;
  },
});

OrderTC.addResolver({
  name: 'orderByBarcode',
  type: [OrderTC],
  args: { barcodes: ['String'], products: ['String'] },
  resolve: async ({ source, args, context, info }) => {
    const barcodes = args.barcodes;
    const products = args.products;
    var filter = {};
    filter['orderProducts.barcode'] = { $in: barcodes };
    if (args.products && args.products.length > 0) {
      filter['orderProducts.productId'] = { $in: products };
    }
    const _order = await Order.find({
      ...filter
    }).sort({ _id: -1 });
    return _order;
  },
});


const redeem = async (orderId, barcodes, products, agent = null, device = null) => {
  var redeemedBarcodes = [];
  var _order;
  var filter = {}

  if (products && products.length > 0) {
    filter['orderProducts.productId'] = { $in: products };
  }

  if (orderId) {
    filter._id = orderId;
    filter.orderStatus = "Confirmed";
    _order = await Order.findOne({
      ...filter
    }).sort({ _id: -1 });
  }
  else {
    filter.orderStatus = "Confirmed";
    filter['orderProducts.barcode'] = barcodes[0];
    filter['orderProducts.orderProductStatus'] = "Open";
    //filter['orderProducts.redemptionDetail.validStatus'] = "Unused";
    filter['orderProducts.redemptionDetail.usesRemaining'] = { $gt: 0 };
    _order = await Order.findOne({
      ...filter
    }).sort({ _id: -1 });
  }

  //console.log('order -> ', JSON.stringify(_order, undefined, 2));
  if (_order) {
    var orderProducts = [];
    _order.orderProducts.forEach(op => {
      if (barcodes.includes(op.barcode.toString()) && op.orderProductStatus === "Open" &&
        ["Unused", "Used"].includes(op.redemptionDetail.validStatus) && op.redemptionDetail.usesRemaining > 0) {

        op.redemptionDetail.usesRemaining = op.redemptionDetail.usesRemaining - 1;
        op.redemptionDetail.validStatus = "Used"
        if (op.redemptionDetail.usesRemaining === 0) { op.orderProductStatus = "Used"; }
        var redemptions = {
          date: new Date() + "",
          agent: agent,
          device: device,
        }
        op.redemptionDetail.redemptions.push(redemptions);

        redeemedBarcodes.push(op.barcode);
      }
      orderProducts.push(op);
    });
    const order = await _order.updateOne({ orderProducts: orderProducts });
  }

  return redeemedBarcodes;
}

OrderTC.addResolver({
  name: 'redeemTickets',
  type: ['String'],
  args: { orderId: 'String', barcodes: ['String'], products: ['String'], agent: 'String', device: 'String' },
  resolve: async ({ source, args, context, info }) => {
    const orderId = args.orderId;
    const barcodes = args.barcodes;
    const products = args.products;
    var redeemedBarcodes = [];

    if (orderId) {
      var result = await redeem(orderId, barcodes, products, args.agent, args.device);
      result.forEach(r => {
        redeemedBarcodes.push(r);
      });
    }
    else {
      for (let i = 0; i < barcodes.length; i++) {
        var result = await redeem(null, [barcodes[i]], products, args.agent, args.device);
        result.forEach(r => {
          redeemedBarcodes.push(r);
        });
      }
    }

    return redeemedBarcodes;
  },
});


OrderTC.addResolver({
  name: 'createOrder',
  type: OrderTC,
  args: {
    order: OrderITC,
  },
  resolve: async ({ source, args, context, info }) => {
    const order = await Order.create({ ...args.order });
    return order;
  },
});

OrderTC.addResolver({
  name: 'updateOrder',
  type: 'Boolean',
  args: {
    order: OrderITC,
    orderId: 'String',
  },
  resolve: async ({ source, args, context, info }) => {
    const _order = await Order.findOne({ _id: args.orderId });
    if (_order) {
      var opList = [];
      var refundedList = [];
      var payments = [];
      var taxes = [];
      var fees = [];
      var paymentList = [];
      if (args.order.orderStatus === 'Confirmed') {
        _order.orderProducts.forEach((element) => {
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
        opList.forEach((item) => {
          refundedList.push(item);
        });

        args.order.orderProducts = refundedList;
      }

      if (args.order.orderStatus === 'Refunded') {
        _order.orderProducts.forEach((element) => {
          element.orderProductStatus = 'Voided';
          element.redemptionDetail.validStatus = "Void. Cancelled.";
          element.redemptionDetail.usesRemaining = 0;
          opList.push(element);
        });
        _order.orderProducts.forEach((element) => {
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
        _order.orderPayments.forEach((element) => {
          var payment = {};
          payment.transactionType = 'Refund';
          payment.paymentType = element.paymentType;
          payment.cardHolderName = element.cardHolderName;
          payment.creditCardLastFour = element.creditCardLastFour;
          payment.amountPaid = -Math.abs(element.amountPaid);
          payments.push(payment);
          paymentList.push(element);
        });

        opList.forEach((item) => {
          refundedList.push(item);
        });
        paymentList.forEach((item) => {
          payments.push(item);
        });
        args.order.orderProducts = refundedList;
        args.order.orderTaxes = taxes;
        args.order.orderPayments = payments;
      }

      const order = await _order.updateOne({ ...args.order });
    } else {
      return new Error('Order does not exists');
    }
    return true;
  },
});

OrderTC.addResolver({
  name: 'partialRefund',
  type: 'Boolean',
  args: {
    order: OrderITC,
    orderId: 'String',
  },
  resolve: async ({ source, args, context, info }) => {
    const _order = await Order.findOne({ _id: args.orderId });
    if (_order) {
      var opList = [];
      var refundedList = [];
      var payments = [];
      var taxes = [];
      var fees = [];
      var paymentList = [];
      var amountPaid = 0;
      var opId = args.order.orderProducts[0]._id;
      _order.orderProducts.forEach((element) => {
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
          amountPaid =
            element.salesPrice +
            element.orderTax.taxAmount +
            element.orderFees.feeAmount;
          var redemptionDetail = {};
          redemptionDetail.redemptions = element.redemptionDetail.redemptions;
          redemptionDetail.validStatus = "Void. Refunded.";
          redemptionDetail.usesRemaining = 0;
          opItem.redemptionDetail = redemptionDetail;

          refundedList.push(opItem);
        }
        opList.push(element);
      });

      opList.forEach((item) => {
        refundedList.push(item);
      });
      var payment = {};
      _order.orderPayments.forEach((element) => {
        payment.transactionType = 'Refund';
        payment.paymentType = element.paymentType;
        payment.cardHolderName = element.cardHolderName;
        payment.creditCardLastFour = element.creditCardLastFour;
        payment.amountPaid = -Math.abs(amountPaid);
        paymentList.push(element);
      });

      payments.push(payment);
      paymentList.forEach((item) => {
        payments.push(item);
      });
      args.order.orderProducts = refundedList;
      args.order.orderPayments = payments;
      var list = _order.orderProducts.filter(
        (args) => args.orderProductStatus === 'Open'
      );

      if (list.length === 0) {
        args.order.orderStatus = 'Refunded';
      }
      const order = await _order.updateOne({ ...args.order });
    } else {
      return new Error('Order does not exists');
    }
    return true;
  },
});
