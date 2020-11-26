/* @flow */
import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import { composeWithMongoose } from '../schema/schemaComposer';
import { schemaComposer, toInputObjectType } from 'graphql-compose';
import { AccountTC } from './account';
import { FileSchema, processUpload, FileTC } from './file';
import { GraphQLUpload } from 'apollo-upload-server';
import { createWriteStream, mkdir } from 'fs';
import { uploadToS3 } from '../utils/S3Service';
import { VenueTC } from './venue';

export const EventSchema: Schema<any> = new Schema(
    {
        accountId: {
            type: String,
            required: true,
        },
        venueId: {
            type: String,
            required: true,
        },
        categoryId: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            required: false,
        },
        step: {
            type: Number,
            required: false,
        },
        //The Basics
        eventName: {
            type: String,
            required: false,
        },
        eventDescription: {
            type: String,
            required: false,
        },
        eventLocation: {
            type: Object,
            required: false,
        },
        salesChannels: {
            type: Array,
            required: false,
        },
        isDisplayRemainingTickets: {
            type: Boolean,
            required: false,
        },
        file: {
            type: [FileSchema],
        },
        //Event Details
        isRecurringEvent: {
            type: Boolean,
            required: false,
        },
        eventDatesRecurring: {
            type: Object,
            required: false,
        },
        eventDatesNonRecurring: {
            type: [Object],
            required: false,
        },
        //Ticket Type
        isPriceBySalesChannel: {
            type: Boolean,
            required: false,
        },
        tickets: {
            type: [Object],
            required: false,
        },
        //Data Collection
        hasDataCollection: {
            type: Boolean,
            required: false,
        },
        questions: {
            type: [Object],
            required: false,
        },
        //Taxes & Fees
        hasTaxAndFees: {
            type: Boolean,
            required: false,
        },
        taxes: {
            type: [Object],
            required: false,
        },
        fees: {
            type: [Object],
            required: false,
        },
        //Access
        isPrivateEvent: {
            type: Boolean,
            required: false,
        },
        promoCode: {
            type: String,
            required: false,
        },
        //
        account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'account',
        },
        venue: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'venue',
        },
    },
    {
        collection: 'events',
        timestamps: true,
    }
);
export const Event = mongoose.model('Event', EventSchema);
export const EventTC = composeWithMongoose<any>(Event);
export const EventITC = EventTC.getITC();

EventTC.addResolver({
    name: 'saveEvent',
    type: EventTC,
    args: {
        event: EventITC,
        file: [GraphQLUpload],
    },
    resolve: async ({ source, args, context, info }) => {
        var eventInput = { ...args.event };
        let prod = {};
        if ((eventInput._id != null) & (eventInput._id != undefined)) {
            const _event = await Event.findOne({ _id: eventInput._id });
            await _event.updateOne(eventInput);
            prod = _event;
        } else {
            prod = await Event.create(eventInput);
        }

        if (args.file != null && args.file != undefined && args.file.length > 0) {
            console.log('file path =' + args.file[0]);
            var id = prod._id;
            var name = prod.name;
            // mkdir(`images/${id}_${name}/`, { recursive: true }, (err) => {
            //   if (err) throw err;
            // });
            prod.file = [];
            for (let index = 0; index < args.file.length; index++) {
                // const upload = await processUpload(
                //   args.file[index],
                //   `./images/${id}_${name}/`
                // );
                const upload = await uploadToS3(args.file[index], id);
                prod.file.push(upload);
            }
            var eventWithFile = await Event.updateOne(
                { _id: id },
                { file: prod.file }
            );
        }
        return prod;
    },
});
EventTC.addResolver({
    name: 'updateEvent',
    type: EventTC,
    args: {
        event: EventITC,
        file: [GraphQLUpload],
    },
    resolve: async ({ source, args, context, info }) => {
        var eventInput = { ...args.event };
        var prod = await Event.findById(eventInput._id);
        if (prod) {
            var res = await prod.updateOne(eventInput);
            if (args.file && args.file.length > 0) {
                prod.file = [];
                console.log('file path =' + args.file[0]);
                var id = prod._id;
                var name = prod.name;
                // mkdir(`images/${id}_${name}/`, { recursive: true }, (err) => {
                //   if (err) throw err;
                // });
                for (let index = 0; index < args.file.length; index++) {
                    // const upload = await processUpload(
                    //   args.file[index],
                    //   `./images/${id}_${name}/`
                    // );
                    const upload = await uploadToS3(args.file[index], id);
                    prod.file.push(upload);
                }
                var eventWithFile = await Event.updateOne(
                    { _id: id },
                    { file: prod.file }
                );
            }
        }
        return prod;
    },
});

EventTC.addResolver({
    name: 'eventById',
    type: EventTC,
    args: { eventId: 'String' },
    resolve: async ({ source, args, context, info }) => {
        return await Event.findOne({ _id: args.eventId });
    },
});

EventTC.addRelation('account', {
    resolver: () => AccountTC.getResolver('findOne'),
    prepareArgs: {
        filter: (source) => ({ _id: source.accountId }),
        skip: null,
        sort: null,
    },
    projection: { account: true },
});

EventTC.addRelation('venue', {
    resolver: () => VenueTC.getResolver('findOne'),
    prepareArgs: {
        filter: (source) => ({ venueId: source.venueId }),
        skip: null,
        sort: null,
    },
    projection: { venue: true },
});
