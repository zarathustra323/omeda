const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Query {
  "Looks up a demographic by ID."
  demographicById(input: DemographicByIdQueryInput!): Demographic
}

type Demographic {
  "The demographic identifier."
  id: Int! @apiValue
  "The demographic type."
  type: DemographicType! @codeOrType(instance: "DemographicType", path: "DemographicType")
  "The name of the demographic."
  description: String @apiValue
  "This is the demographic ID that is used in the Omeda's V10 system."
  legacyId: String @apiValue(path: "DemoLegacyId")
  "Information for disaplying the demographic on web forms."
  webform: Webform
  "A list of demographic value elements. These define the values associated with the customized demographic information that is being collected about a customer."
  values: [DemographicValue!]! @apiValue(path: "DemographicValues", as: ARRAY)
}

type DemographicValue {
  "The demographic value identifier."
  id: Int! @apiValue
  "The demographic value type."
  type: DemographicValueType! @codeOrType(instance: "DemographicValueType", path: "DemographicValueType")
  "The name of the demographic value."
  description: String! @apiValue
  "The short name of the demographic value."
  shortDescription: String @apiValue
  "An alternate ID, if applicable."
  alternateId: String @apiValue
  "Order in which to display demographic items."
  sequence: Int @apiValue
  "Information for disaplying the demographic value on web forms."
  webform: Webform
}

input DemographicByIdQueryInput {
  "The demographic ID to lookup."
  id: Int!
}

`;
