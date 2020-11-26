import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import { composeWithMongoose } from '../schema/schemaComposer';
import { DaysSchema } from './days';

export const ProductDetailSchema: Schema<any> = new Schema({
  product: {
    type: String,
    required: false,
  },
  retail: {
    type: Number,
    required: false,
  },
  wholesale: {
    type: Number,
    required: false,
  },
  items: [DaysSchema],
});
