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
  "The product identifier."
  id: Int! @apiValue
  "The product type."
  type: ProductType! @codeOrType(instance: "ProductType", path: "ProductType")
  "The frequency type, e.g. DY for Daily, WK for Weekly, etc."
  frequencyType: ProductFrequencyType @codeOrType(instance: "ProductFrequencyType", path: "FrequencyType")
  "Name of the product."
  description: String @apiValue
  "This is the Product ID that is used in Omeda's V10 system."
  alternateId: String @apiValue
  "If the product is linked to a deployment type, then this ID will be returned."
  deploymentTypeId: Int @apiValue
  "The related deployment type, if applicable."
  deploymentType: DeploymentType
  "A list of MarketingClasses elements. These elements will only be returned if the product type is magazine, newsletter or website."
  marketingClasses: [ProductMarketingClass!]! @apiValue(as: ARRAY)
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

type ProductMarketingClass {
  "Marketing class identifier."
  id: Int! @apiValue
  "Name of the marketing class."
  description: String! @apiValue
  "A short name of the marketing class."
  shortDescription: String @apiValue
  "Marketing class identifier associated with legacy products."
  classId: String @apiValue
  "The marketing class active or inactive status."
  status: ProductMarketingClassStatus @codeOrType(instance: "ProductMarketingClassStatus", path: "StatusCode")
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
