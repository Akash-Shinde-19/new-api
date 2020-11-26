/* @flow */
import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import { composeWithMongoose } from '../schema/schemaComposer';
import { AccountTC } from './account';
import { schemaComposer, toInputObjectType } from 'graphql-compose';

const UserSchema: Schema<any> = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'account'
    },
    roles: [{
      type: String
    }],
    createdBy: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);
const User = model('User', UserSchema);
export const UserTC = composeWithMongoose<any>(User);
UserTC.addRelation('account', {
  resolver: () => AccountTC.getResolver('findOne'),
  prepareArgs: {
    filter: (source) => ({ userId: source.userId }),
    skip: null,
    sort: null,
  },
  projection: { account: true },
});
UserTC.addResolver({
  name: 'userById',
  type: UserTC,
  args: { userId: 'String' },
  resolve: async ({ source, args, context, info }) => {
    return await User.findOne({ userId: args.userId });
  }
});

export const createUserInput = schemaComposer.createObjectTC({
  name: 'CreateUser',
  fields: {
    name: 'String',
    userId: 'String',
    firstName: 'String',
    lastName: 'String',
    email: 'String',
    phone: 'String',
    roles: ["String"],
    createdBy: "String"
  }
});

UserTC.addResolver({
  name: 'createUser',
  type: UserTC,
  args: {
    user: toInputObjectType(createUserInput)
  },
  resolve: async ({ source, args, context, info }) => {
    const _user = await User.findOne({ email: args.user.email });
    if (_user) {
      return new Error("User already exists")
    }

    const user = await User.create({ ...args.user })
    return user;
  }
})

UserTC.addResolver({
  name: 'updateUser',
  type: 'Boolean',
  args: {
    user: toInputObjectType(createUserInput)
  },
  resolve: async ({ source, args, context, info }) => {
    const _user = await User.findOne({ email: args.user.email });
    if (_user) {
      const user = await _user.updateOne({ ...args.user })
    }
    else {
      return new Error("User does not exists")
    }
    return true;
  }
})

UserTC.addResolver({
  name: 'deleteUser',
  type: 'Boolean',
  args: {
    userId: 'String'
  },
  resolve: async ({ source, args, context, info }) => {
    const _user = await User.findOne({ userId: args.userId });
    if (_user) {
      const user = await _user.deleteOne({ userId: args.userId })
    }
    else {
      return new Error("User does not exists")
    }
    return true;
  }
})

//export { userModel as default };