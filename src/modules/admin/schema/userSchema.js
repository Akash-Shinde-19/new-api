/* @flow */
import { UserTC } from "../models/user";

export const UserQuery = {
    userById: UserTC.getResolver('userById'),
    userOne: UserTC.getResolver('findOne'),
    users: UserTC.getResolver('findMany'),
    userCount: UserTC.getResolver('count'),
    userConnection: UserTC.getResolver('connection')
};

export const UserMutation = {
    createUser: UserTC.getResolver('createUser'),
    updateUser: UserTC.getResolver('updateUser'),
    deleteUser: UserTC.getResolver('deleteUser')
}