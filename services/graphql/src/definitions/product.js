const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Query {
  "Finds a single product by product ID."
  productById(input: ProductByIdQueryInput!): Product
}

enum ProductSortFieldEnum {
  ID
  DESCRIPTION
}

type Product {
  id: Int! @apiValue
  description: String @apiValue
  alternateId: String @apiValue
  deploymentTypeId: Int @apiValue
  deploymentType: DeploymentType
}

type ProductConnection {
  "The total number of records found in the query."
  totalCount: Int!
  "An array of edge objects containing the record and the cursor."
  edges: [ProductEdge]!
  "Contains the pagination info for this query."
  pageInfo: PageInfo!
}

type ProductEdge {
  "The edge result node."
  node: Product!
  "The opaque cursor value for this record edge."
  cursor: String!
}

input ProductByIdQueryInput {
  "The product ID to lookup."
  id: Int!
  "Whether to run the query in strict mode (default). If set, and not found, will throw an error."
  strict: Boolean = true
}

input ProductSortInput {
  "The field to sort by."
  field: ProductSortFieldEnum
  "The sort order, either \`DESC\` or \`ASC\`"
  order: SortOrderEnum
}

input ProductsQueryInput {
  "Sets sorting criteria for the query."
  sort: ProductSortInput
  "Sets pagination (limit/after) criteria for the query."
  pagination: PaginationInput = {}
}

`;
