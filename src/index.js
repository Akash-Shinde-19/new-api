import dotEnv from 'dotenv';
import { connection } from './modules';
const { localApolloServer, adminApolloServer } = require('./modules/admin');
dotEnv.config();
connection();

const server = localApolloServer();

server.listen(process.env.PORT).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}admin`);
});