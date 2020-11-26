"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DailyScheduleSchema = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _schemaComposer = require("../schema/schemaComposer");

var _operatingPeriod = require("./operatingPeriod");

var DailyScheduleSchema = new _mongoose.Schema({
  operatingPeriodsId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  isClosed: {
    type: Boolean,
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
}); // const DailySchedule = model('DailySchedule', DailyScheduleSchema);
// export const DailyScheduleTC = composeWithMongoose<any>(DailySchedule);
// DailyScheduleTC.addRelation('operatingPeriod', {
//     resolver: () => OperatingPeriodTC.getResolver('findOne'),
//     prepareArgs: {
//       filter: (source) => ({ operating_periods_id: source.Id }),
//       skip: null,
//       sort: null,
//     },
//     projection: { operatingPeriod: true },
//   });
//export { userModel as default };

exports.DailyScheduleSchema = DailyScheduleSchema;