import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import { composeWithMongoose } from '../schema/schemaComposer';

export const EventLocation: Schema<any> = new Schema({
    address1: {
        type: String,
        required: false,
    },
    address2: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    zip: {
        type: String,
        required: false,
    },
});

export const EventTax: Schema<any> = new Schema({
    name: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: false,
    },
    isExclusive: {
        type: Boolean,
        required: false,
    }
});

export const EventFee: Schema<any> = new Schema({
    name: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: false,
    },
    isExclusive: {
        type: Boolean,
        required: false,
    },
    Web: {
        type: Boolean,
        required: false,
    },
    BoxOffice: {
        type: Boolean,
        required: false,
    },
    Mobile: {
        type: Boolean,
        required: false,
    },
    Kiosk: {
        type: Boolean,
        required: false,
    }
});
