const express = require('express');
const expressGraphQL = require('express-graphql');
const { find } = require('lodash');
const { singers, songs } = require('./schema/data');

const app = express();

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList
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

const SongType = new GraphQLObjectType({
  name: 'SongType',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    votes: { type: GraphQLInt },
    singer: {
      type: SingerType,
      resolve(root, args, context) {
        return find(singers, { id: root.singerId })
      }
    }
  }
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    singer: {
      type: SingerType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(root, args, context) {
        context.res.header('x-auth', 'abc123')
        const singer = find(singers, { id: args.id })
        return singer;
      }
    },
    songs: {
      type: new GraphQLList(SongType),
      resolve(root, args, context) {
        return songs
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQuery
});



app.use('/graphql', expressGraphQL({ schema, graphiql: true }))

app.listen('3020', () => {
  console.log('server startup port 3020 ')
});