/* @flow */
import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import { composeWithMongoose } from '../schema/schemaComposer';
import { schemaComposer, toInputObjectType } from 'graphql-compose';

export const OrderFeesSchema: Schema<any> = new Schema(
  {
    feeName: {
      type: String,
      required: false,
    },
    feeAmount: {
      type: Number,
      required: false,
    },
    appliedType: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
