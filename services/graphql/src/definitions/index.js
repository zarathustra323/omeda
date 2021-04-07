const { gql } = require('apollo-server-express');
const formatDateDirectives = require('@parameter1/graphql-directive-format-date/directives');

module.exports = gql`

${formatDateDirectives.typeDefs}
directive @brandData on FIELD_DEFINITION
directive @value(path: String, as: ValueDirectiveAsEnum) on FIELD_DEFINITION

scalar Date
scalar JSON
scalar JSONObject

enum ValueDirectiveAsEnum {
  ARRAY
  OBJECT
}

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
