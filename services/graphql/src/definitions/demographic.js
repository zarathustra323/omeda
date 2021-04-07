const { gql } = require('apollo-server-express');

module.exports = gql`

type Demographic {
  id: Int! @apiValue
  type: DemographicType! @codeOrType(instance: "DemographicType", path: "DemographicType")
  description: String @apiValue
  legacyId: String @apiValue(path: "DemoLegacyId")
  webform: Webform
}

`;
