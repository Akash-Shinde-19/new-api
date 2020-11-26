/* @flow */
import { MarketTC } from "../models/market";

export const MarketQuery = {
    marketById: MarketTC.getResolver('marketById'),
    marketOne: MarketTC.getResolver('findOne'),
    markets: MarketTC.getResolver('findMany'),
    marketCount: MarketTC.getResolver('count'),
    marketConnection: MarketTC.getResolver('connection')
};

export const MarketMutation = {
    createMarket: MarketTC.getResolver('createMarket'),
    updateMarket: MarketTC.getResolver('updateMarket')
}