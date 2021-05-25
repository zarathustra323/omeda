const { gql } = require('apollo-server-express');
const formatDateDirectives = require('@parameter1/graphql-directive-format-date/directives');

const codesAndTypes = require('./codes-and-types');
const customer = require('./customer');
const demographic = require('./demographic');
const deployment = require('./deployment');

module.exports = gql`

${formatDateDirectives.typeDefs}
directive @brandData on FIELD_DEFINITION
directive @codeOrType(instance: String!, path: String) on FIELD_DEFINITION
directive @apiValue(path: String, as: ApiValueDirectiveAsEnum) on FIELD_DEFINITION

scalar Date
scalar JSON
scalar JSONObject

enum ApiValueDirectiveAsEnum {
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

type Webform {
  text: String @apiValue(path: "OmedaWebformText")
  viewCode: WebformViewCode @codeOrType(instance: "WebformViewCode", path: "OmedaWebformViewCode")
  sequence: Int @apiValue(path: "OmedaWebformSequence")
}

${codesAndTypes}
${customer}
${demographic}
${deployment}

`;
