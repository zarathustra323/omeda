const { gql } = require('apollo-server-express');

module.exports = gql`

type DeploymentType {
  id: Int! @apiValue
  name: String! @apiValue
  description: String @apiValue
  alternateId: String @apiValue
  statusCode: Int! @apiValue
}

`;
