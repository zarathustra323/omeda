const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Query {
  "Finds a single product by product ID."
  productById(input: ProductByIdQueryInput!): Product
}

type Product {
  id: Int! @apiValue
  description: String @apiValue
  alternateId: String @apiValue
  deploymentTypeId: Int @apiValue
  deploymentType: DeploymentType
}

input ProductByIdQueryInput {
  "The product ID to lookup."
  id: Int!
  "Whether to run the query in strict mode (default). If set, and not found, will throw an error."
  strict: Boolean = true
}

`;
