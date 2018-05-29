const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema')

const app = express();

app.use('/graphql', expressGraphQL({ schema, graphiql: true }))

app.listen('3020', () => {
  console.log('server startup port 3020 ')
})