import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import { composeWithMongoose } from '../schema/schemaComposer';

export const FeeSchema: Schema<any> = new Schema({
  feeName: {
    type: String,
    required: false,
  },
  feeAmount: {
    type: Number,
    required: false,
  },
  feeType: {
    type: String,
    required: false,
  },
  appliedType: {
    type: String,
    required: false,
  },
});
