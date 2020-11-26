import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import { composeWithMongoose } from '../schema/schemaComposer';
export const DaysSchema: Schema<any> = new Schema({
  name: {
    type: String,
    required: false,
  },
  isClosed: {
    type: Boolean,
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
});
