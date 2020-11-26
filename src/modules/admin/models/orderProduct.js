/* @flow */
import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import { composeWithMongoose } from '../schema/schemaComposer';
import { schemaComposer, toInputObjectType } from 'graphql-compose';
import { OrderTaxSchema } from './orderTax';
import { OrderFeesSchema } from './orderFees';
import { RedemptionDetailSchema } from './redemptionDetail';

export const OrderProductSchema: Schema<any> = new Schema(
  {
    productId: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    productType: {
      type: String,
      required: false,
    },
    barcode: {
      type: String,
      required: false,
    },
    orderProductStatus: {
      type: String,
      required: false,
    },
    salesPrice: {
      type: Number,
      required: false,
    },
    itemPrice: {
      type: Number,
      required: false,
    },
    maxVisit: {
      type: Number,
      required: false,
    },
    maxVisitPerDay: {
      type: Number,
      required: false,
    },
    visitDate: {
      type: String,
      required: false,
    },
    orderTax: {
      type: OrderTaxSchema,
      required: false,
    },
    orderFees: {
      type: OrderFeesSchema,
      required: false,
    },
    redemptionDetail: {
      type: RedemptionDetailSchema,
      required: false,
    }
  },

  {
    timestamps: true,
  }
);
