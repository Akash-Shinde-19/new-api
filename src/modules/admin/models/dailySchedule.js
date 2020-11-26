/* @flow */
import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import { composeWithMongoose } from '../schema/schemaComposer';
import{OperatingPeriodTC} from './operatingPeriod';
export const DailyScheduleSchema: Schema<any> = new Schema(
  {
    operatingPeriodsId: {
      type: String,
      required: true
  },
    name: {
      type: String,
      required: true,
    },
    isClosed: {
    type:Boolean,
    required:true
},
startTime:
{
    type:String,
    required:true
},
endTime: {
    type:String,
    required:true
},
operatingPeriod: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'operatingPeriod'
  }

},
  {
    timestamps: true,
  }
);
// const DailySchedule = model('DailySchedule', DailyScheduleSchema);
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
