const { GraphQLSchema } = require('graphql')
const RootQuery = require('./query/rootQuery')

const schema = new GraphQLSchema({
  query: RootQuery
})

module.exports = schema;