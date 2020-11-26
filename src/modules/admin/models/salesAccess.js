import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import { composeWithMongoose } from '../schema/schemaComposer';

export const SalesAccessSchema: Schema<any> = new Schema({
  revealCode: {
    type: String,
    required: false,
  },
  isModePublic: {
    type: Boolean,
    required: false,
  },
  isModePrivate: {
    type: Boolean,
    required: false,
  },
  isMySalesChannel: {
    type: Boolean,
    required: false,
  },
  isLocalPartners: {
    type: Boolean,
    required: false,
  },
  isLocalAndNationalSearch: {
    type: Boolean,
    required: false,
  },
});
