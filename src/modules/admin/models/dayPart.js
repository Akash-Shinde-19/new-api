/* @flow */
import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import { composeWithMongoose } from '../schema/schemaComposer';
import{OperatingPeriodTC} from './operatingPeriod';
export const DayPartSchema: Schema<any> = new Schema(
  {
    operatingPeriodsId: {
      type: String,
      required: true
  },
 name: {
      type: String,
      required: true,
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
// const DayPart = model('DayPart', DayPartSchema);
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
