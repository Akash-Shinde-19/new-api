import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import { composeWithMongoose } from '../schema/schemaComposer';
import { DaysSchema } from './days';

export const RedemptionsSchema: Schema<any> = new Schema({
    date: {
        type: String,
        required: false,
    },
    agent: {
        type: String,
        required: false,
    },
    device: {
        type: String,
        required: false,
    },
});

export const RedemptionDetailSchema: Schema<any> = new Schema({
    redemptions: {
        type: [RedemptionsSchema],
        required: false,
    },
    validStatus: {
        type: String,
        required: false,
    },
    usesRemaining: {
        type: Number,
        required: false,
    },
});
