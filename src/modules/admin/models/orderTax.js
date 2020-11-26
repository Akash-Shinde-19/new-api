/* @flow */
import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import { composeWithMongoose } from '../schema/schemaComposer';
import { schemaComposer, toInputObjectType } from 'graphql-compose';

export const OrderTaxSchema: Schema<any> = new Schema(
  {
    taxName: {
      type: String,
      required: false,
    },
    taxAmount: {
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
