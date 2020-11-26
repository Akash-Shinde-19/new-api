"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DayPartSchema = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _schemaComposer = require("../schema/schemaComposer");

var _operatingPeriod = require("./operatingPeriod");

var DayPartSchema = new _mongoose.Schema({
  operatingPeriodsId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  operatingPeriod: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'operatingPeriod'
  }
}, {
  timestamps: true
}); // const DayPart = model('DayPart', DayPartSchema);
// export const DayPartTC = composeWithMongoose<any>(DayPart);
// DayPartTC.addRelation('operatingPeriod', {
//   resolver: () => OperatingPeriodTC.getResolver('findOne'),
//   prepareArgs: {
//     filter: (source) => ({ operating_periods_id: source.Id }),
//     skip: null,
//     sort: null,
//   },
//   projection: { operatingPeriod: true },
// });
//export { userModel as default };

exports.DayPartSchema = DayPartSchema;