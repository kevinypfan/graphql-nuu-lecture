const express = require('express');
const expressGraphQL = require('express-graphql');
const { find } = require('lodash');
const { singers } = require('./schema/data');

const app = express();

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} = require('graphql');

const SingerType = new GraphQLObjectType({
  name: 'SingerType',
  description: "query for singer",
  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    singer: {
      type: SingerType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(root, args, context) {
        const singer = find(singers, { id: args.id })
        return singer;
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQuery
});



app.use('/graphql', expressGraphQL({ schema, graphiql: true }));

app.listen('3020', () => {
  console.log('server startup port 3020 ')
});