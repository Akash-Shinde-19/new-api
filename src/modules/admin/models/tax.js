import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import { composeWithMongoose } from '../schema/schemaComposer';

export const TaxSchema: Schema<any> = new Schema({
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
});
