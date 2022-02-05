const { gql } = require('apollo-server-express');
const pagination = require('@parameter1/graphql-mongodb-pagination/definitions');

const codesAndTypes = require('./codes-and-types');
const customer = require('./customer');
const demographic = require('./demographic');
const deploymentType = require('./deployment-type');
const email = require('./email');
const product = require('./product');

module.exports = gql`

directive @codeOrType(instance: String!, path: String) on FIELD_DEFINITION
directive @apiValue(path: String, as: ApiValueDirectiveAsEnum) on FIELD_DEFINITION

scalar BigInt
scalar DateTime
scalar JSON
scalar JSONObject

${pagination}

enum ApiValueDirectiveAsEnum {
  ARRAY
  OBJECT
}

type Query {
  "A generic ping/pong test query."
  ping: String!
  brandComprehensiveLookup: JSONObject!
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
${deploymentType}
${email}
${product}

`;
