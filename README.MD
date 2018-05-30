## Used dependencies:
### nodemon
> 他會去監看您的程式是否有變動，如果有變動會自動幫您做，重新啟動的動作，是方便我們開發時的好幫手。
### express
> 一個簡潔靈活的套件，豐富的HTTP工具。

```javascript
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

//建立Singer Type
const SingerType = new GraphQLObjectType({
  name: 'SingerType',
  description: "query for singer",
  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString }
  }
});

//建立主要 Query 入口
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

//建立 Graphql Schema 
const schema = new GraphQLSchema({
  query: RootQuery
});


//把我們建立的Schema，放入我們的express-graphql的方法裡，graphiql是我們的測試開發頁面的開關。 
app.use('/graphql', expressGraphQL({ schema, graphiql: true }));

//把我們的express應用程式，啟動在3020 Port。
app.listen('3020', () => {
  console.log('server startup port 3020 ')
});
```