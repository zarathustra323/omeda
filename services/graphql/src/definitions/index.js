const { gql } = require('apollo-server-express');

module.exports = gql`

directive @brandData on FIELD_DEFINITION

scalar JSON
scalar JSONObject

type Query {
  "A generic ping/pong test query."
  ping: String!
  brandComprehensiveLookup: JSONObject! @brandData
}

type Mutation {
  "A generic ping/pong test mutation."
  ping: String!
}

`;
