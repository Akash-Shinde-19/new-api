import { EventTC } from '../models/event';


export const EventQuery = {
    eventById: EventTC.getResolver('eventById'),
    eventOne: EventTC.getResolver('findOne'),
    eventMany: EventTC.getResolver('findMany'),
    eventCount: EventTC.getResolver('count'),
    eventConnection: EventTC.getResolver('connection')
};

export const EventMutation = {
    saveEvent: EventTC.getResolver('saveEvent'),
    updateEvent: EventTC.getResolver('updateEvent')
};
