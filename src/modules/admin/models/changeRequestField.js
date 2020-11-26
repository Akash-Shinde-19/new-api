/* @flow */
import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import { composeWithMongoose } from '../schema/schemaComposer';
import { DailyScheduleSchema } from './dailySchedule';
import { DayPartSchema } from './dayPart';

export const ChangeRequestFieldSchema: Schema<any> = new Schema(
  {
    field: {
      type: String,
      required: false,
    },
    currentValue: {
      type: String,
      required: false,
    },
    newValue: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
