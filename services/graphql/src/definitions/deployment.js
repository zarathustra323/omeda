const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Query {
  emailDeploymentSearch(input: EmailDeploymentSearchQueryInput = {}): [DeploymentListItem!]!
}

type DeploymentListItem {
  id: String! @apiValue(path: "TrackId")
  createdBy: String! @apiValue
  createdDate: Date! @apiValue
  deploymentName: String! @apiValue
  deploymentTypeId: Int! @apiValue
  deploymentTypeDescription: String! @apiValue
  finalApprover: String @apiValue
  owner: String! @apiValue
  scheduledDate: Date @apiValue
  sentDate: Date @apiValue
  status: DeploymentStatusEnum! @apiValue
  trackId: String! @apiValue
}

input EmailDeploymentSearchQueryInput {
  statuses: [DeploymentStatusSearchEnum!] = []
}

`;
