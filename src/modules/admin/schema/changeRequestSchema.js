import { ChangeRequestTC } from '../models/changeRequest';

export const ChangeRequestQuery = {
  changeRequestById: ChangeRequestTC.getResolver('changeRequestById'),
  changeRequestOne: ChangeRequestTC.getResolver('findOne'),
  changeRequestMany: ChangeRequestTC.getResolver('findMany'),
  changeRequestCount: ChangeRequestTC.getResolver('count'),
  changeRequestConnection: ChangeRequestTC.getResolver('connection'),
};

export const ChangeRequestMutation = {
  saveChangeRequest: ChangeRequestTC.getResolver('saveChangeRequest'),
};
