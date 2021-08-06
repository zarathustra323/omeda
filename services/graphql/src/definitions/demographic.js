const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Query {
  "Looks up a demographic by ID."
  demographicById(input: DemographicByIdQueryInput!): Demographic
}

type Demographic {
  id: Int! @apiValue
  type: DemographicType! @codeOrType(instance: "DemographicType", path: "DemographicType")
  description: String @apiValue
  legacyId: String @apiValue(path: "DemoLegacyId")
  webform: Webform
  values: [DemographicValue!]! @apiValue(path: "DemographicValues", as: ARRAY)
}

type DemographicValue {
  id: Int! @apiValue
  type: DemographicValueType! @codeOrType(instance: "DemographicValueType", path: "DemographicValueType")
  description: String! @apiValue
  shortDescription: String @apiValue
  alternateId: String @apiValue
  sequence: Int @apiValue
  webform: Webform
}

input DemographicByIdQueryInput {
  "The demographic ID to lookup."
  id: Int!
}

`;
