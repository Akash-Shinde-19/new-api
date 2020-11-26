/* @flow */
import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import { composeWithMongoose } from '../schema/schemaComposer';
import { MarketTC } from './market';
import { schemaComposer, toInputObjectType } from 'graphql-compose';

 export const CitySchema: Schema<any> = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        }
    }
);


