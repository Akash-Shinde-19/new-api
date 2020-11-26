import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import { composeWithMongoose } from '../schema/schemaComposer';
import { ProductDetailSchema } from './productDetail';
export const PriceDetailSchema: Schema<any> = new Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  dayPart: {
    type: String,
    required: true,
  },
  products: [ProductDetailSchema],
});
