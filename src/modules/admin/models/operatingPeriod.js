/* @flow */
import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import { composeWithMongoose } from '../schema/schemaComposer';
import { DailyScheduleSchema } from './dailySchedule';
import { DayPartSchema } from './dayPart';

export const OperatingPeriodSchema: Schema<any> = new Schema(
  {
    accountId: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    startDate: {
      type: String,
      required: false,
    },
    startTime: {
      type: String,
      required: false,
    },
    endDate: {
      type: String,
      required: false,
    },
    endTime: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    year: {
      type: String,
      required: false,
    },
    shortDescription: {
      type: String,
      required: false,
    },
    longDescription: {
      type: String,
      required: false,
    },
    dailySchedule: [DailyScheduleSchema],
    dayParts: [DayPartSchema],
  },
  {
    timestamps: true,
  }
);
// const OperatingPeriod = model('OperatingPeriod', OperatingPeriodSchema);
// export const OperatingPeriodTC = composeWithMongoose<any>(OperatingPeriod);
// OperatingPeriodTC.addRelation('dayParts', {
//   resolver: () => DayPartTC.getResolver('findMany'),
//   prepareArgs: {
//     filter: (source) => ({ operatingPeriodsId: source._id }),
//     skip: null,
//     sort: null,
//   },
//   projection: { dayParts: true },
// });
// OperatingPeriodTC.addRelation('dailySchedule', {
//     resolver: () => DailyScheduleTC.getResolver('findMany'),
//     prepareArgs: {
//       filter: (source) => ({ operatingPeriodsId: source._id }),
//       skip: null,
//       sort: null,
//     },
//     projection: { dailySchedule: true },
//   })
// OperatingPeriodTC.addResolver({
//   name:'accountOperatingPeriods',
//   type:[OperatingPeriodTC],
//   args:{accountId:'String'},
//   resolve : async ({ source, args, context, info }) => {
//     return await OperatingPeriod.find({accountId:args.accountId});
//   }
// });
//export { userModel as default };
