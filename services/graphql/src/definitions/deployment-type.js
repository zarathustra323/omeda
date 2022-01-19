const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Query {
  "Finds a single deployment type by ID."
  deploymentTypeById(input: DeploymentTypeByIdQueryInput!): DeploymentType
}

type DeploymentType {
  "The deployment type identifier."
  id: Int! @apiValue
  "The name of the deployment type."
  name: String! @apiValue
  description: String @apiValue
  "The text description of the deployment type."
  longDescription: String @apiValue
  "The client's associated value to Omeda’s deployment type identifier."
  alternateId: String @apiValue
  "The deployment type status code."
  status: DeploymentTypeStatus! @codeOrType(instance: "DeploymentTypeStatus", path: "StatusCode")
  "Products related to this deployment type."
  products(input: DeploymentTypeProductsInput = {}): ProductConnection!
}

input DeploymentTypeByIdQueryInput {
  "The deployment type ID to lookup."
  id: Int!
  "Whether to run the query in strict mode (default). If set, and not found, will throw an error."
  strict: Boolean = true
}

input DeploymentTypeProductsInput {
  "Sets sorting criteria for the query."
  sort: ProductSortInput
  "Sets pagination (limit/after) criteria for the query."
  pagination: PaginationInput = {}
}

`;
