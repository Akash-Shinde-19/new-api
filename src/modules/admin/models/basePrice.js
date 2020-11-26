import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import { composeWithMongoose } from '../schema/schemaComposer';
export const BasePriceSchema: Schema<any> = new Schema({
  productType: {
    type: String,
    required: true,
  },
  retail: {
    type: Number,
    required: false,
  },
  wholesale: {
    type: Number,
    required: true,
  },
});
