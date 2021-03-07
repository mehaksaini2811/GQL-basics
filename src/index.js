import { GraphQLServer } from "graphql-yoga";
import {Query,Post,User,Picture} from './graphql/resolvers/index'


const Server = new GraphQLServer({
  typeDefs: './src/graphql/resolvers/schema.graphql',
  resolvers: {
    Query,
    Post,
    User,
    Picture
  }
});

Server.start(() => {
  console.log("and running");
});
