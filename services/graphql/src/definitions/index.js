const { gql } = require('apollo-server-express');

module.exports = gql`

scalar JSON
scalar JSONObject

type Query {
  "A generic ping/pong test query."
  ping: String!
}

type Mutation {
  "A generic ping/pong test mutation."
  ping: String!
}

`;
