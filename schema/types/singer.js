const {
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
})

module.exports = SingerType;