const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Query {
  "Finds a single deployment type by ID."
  deploymentTypeById(input: DeploymentTypeByIdQueryInput!): DeploymentType
}

type DeploymentType {
  id: Int! @apiValue
  name: String! @apiValue
  description: String @apiValue
  alternateId: String @apiValue
  statusCode: Int! @apiValue
}

input DeploymentTypeByIdQueryInput {
  "The deployment type ID to lookup."
  id: Int!
  "Whether to run the query in strict mode (default). If set, and not found, will throw an error."
  strict: Boolean = true
}

`;
