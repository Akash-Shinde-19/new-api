const ApolloServer = require('apollo-server').ApolloServer;
// const schema = require('./schema/schema');
const jwt = require('jsonwebtoken');
const ApolloServerLambda = require('apollo-server-lambda').ApolloServer;
const { gql } = require('apollo-server-lambda');
const { GraphQLSchema } = require('graphql');
const mongoose = require('mongoose');
import { schema } from './schema/schema';
import { MongoClient } from 'mongodb';

const skipToken = (operationName, query) => {
  const skipList = ['createUser'];
  const valid = skipList.includes(operationName);
  if (valid) {
    if (query.match(new RegExp(operationName, 'g') || []).length === 2) {
      return true;
    }
  }
  return false;
};

function adminApolloServer() {
  return new ApolloServerLambda({
    schema,
    context: async () => {
      try {
        console.log({
          connectionString:
            process.env.MONGO_DB_URL,
        });
        mongoose.set('debug', true);
        await mongoose.connect(
          process.env.MONGO_DB_URL,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }
        );
        console.log('Database Connected Successfully');
      } catch (error) {
        console.log('failure');
        console.log(error);
        //throw error;
      }
    },
  });
}

function localApolloServer() {
  return new ApolloServer({
    schema,
    playground: {
      endpoint: '/admin',
    },
  });
}

module.exports = { adminApolloServer, localApolloServer };
