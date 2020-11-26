/* @flow */
import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import { composeWithMongoose } from '../schema/schemaComposer';
import { CitySchema } from './city';
import { schemaComposer, toInputObjectType } from 'graphql-compose';

const MarketSchema: Schema<any> = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        selected: {
            type: Boolean,
            required: true,
        },
        code: {
            type: String,
            required: true
        },
        cities: [CitySchema]
    },
    {
        collection: 'markets',
    },
    {
        timestamps: true,
    }
);

const Market = model('Market', MarketSchema);
export const MarketTC = composeWithMongoose<any>(Market);
export const MarketITC = MarketTC.getInputTypeComposer();

  
// MarketTC.addRelation('cities', {
//     resolver: () => CityTC.getResolver('findMany'),
//     prepareArgs: {
//         filter: (source) => ({ marketId: source._id }),
//         skip: null,
//         sort: null,
//     },
//     projection: { cities: true },
// });

MarketTC.addResolver({
    name: 'marketById',
    type: MarketTC,
    args: { _id: 'String' },
    resolve: async ({ source, args, context, info }) => {
        return await Market.findOne({ _id: args._id });
    }
});

MarketTC.addResolver({
    name: 'createMarket',
    type: MarketTC,
    args: {
        market: MarketITC
    },
    resolve: async ({ source, args, context, info }) => {
        const market = await Market.create({ ...args.market })
        return market;
    }
})

MarketTC.addResolver({
    name: 'updateMarket',
    type: 'Boolean',
    args: {
        market: MarketITC
    },
    resolve: async ({ source, args, context, info }) => {
        const _market = await Market.findOne({ _id: args.market._id });
        if (_market) {
            const market = await _market.updateOne({ ...args.market })
        }
        else {
            return new Error("Market does not exists")
        }
        return true;
    }
})

