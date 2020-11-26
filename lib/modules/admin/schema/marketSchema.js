"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarketMutation = exports.MarketQuery = void 0;

var _market = require("../models/market");

var MarketQuery = {
  marketById: _market.MarketTC.getResolver('marketById'),
  marketOne: _market.MarketTC.getResolver('findOne'),
  markets: _market.MarketTC.getResolver('findMany'),
  marketCount: _market.MarketTC.getResolver('count'),
  marketConnection: _market.MarketTC.getResolver('connection')
};
exports.MarketQuery = MarketQuery;
var MarketMutation = {
  createMarket: _market.MarketTC.getResolver('createMarket'),
  updateMarket: _market.MarketTC.getResolver('updateMarket')
};
exports.MarketMutation = MarketMutation;