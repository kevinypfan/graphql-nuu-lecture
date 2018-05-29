const { GraphQLObjectType, GraphQLID } = require('graphql')
const { find } = require('lodash')
const SingerType = require('../types/singer')
const { singers } = require('../data')

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
})

module.exports = RootQuery;