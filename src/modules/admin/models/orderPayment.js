/* @flow */
import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import { composeWithMongoose } from '../schema/schemaComposer';
import { schemaComposer, toInputObjectType } from 'graphql-compose';

export const OrderPaymentSchema: Schema<any> = new Schema(
  {
    transactionType: {
      type: String,
      required: false,
    },
    paymentType: {
      type: String,
      required: false,
    },
    cardHolderName: {
      type: String,
      required: false,
    },
    creditCardType: {
      type: String,
      required: false,
    },
    creditCardLastFour: {
      type: String,
      required: false,
    },
    amountPaid: {
      type: Number,
      required: false,
    },
    orderPaymentStatus: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
