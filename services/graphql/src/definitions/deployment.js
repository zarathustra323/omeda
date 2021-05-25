const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Query {
  emailDeploymentSearch(input: EmailDeploymentSearchQueryInput = {}): [DeploymentListItem!]!
}

type DeploymentListItem {
  id: String! @apiValue(path: "TrackId")
  createdBy: String! @apiValue
  createdDate: Date! @apiValue
  deploymentDesignation: DeploymentDesignation! @codeOrType(instance: "DeploymentDesignation")
  deploymentName: String! @apiValue
  deploymentTypeId: Int! @apiValue
  deploymentTypeDescription: String! @apiValue
  finalApprover: String @apiValue
  owner: String! @apiValue
  scheduledDate: Date @apiValue
  sentDate: Date @apiValue
  status: DeploymentStatus! @codeOrType(instance: "DeploymentStatus")
  trackId: String! @apiValue
}

input EmailDeploymentSearchQueryInput {
  "An array of Deployment Designations."
  deploymentDesignations: [DeploymentDesignationEnum!] = []
  "Text match for deployment name."
  deploymentName: String
  "The deployment type ID you wish to filter the results by."
  deploymentTypeId: Int
  "Text match for user. Matches both the deployment Owner and the deployment creator. In the case of API deployments, the owner and the creator will be the same user."
  enteredByOrAssignedTo: String
  "Maximum number of deployments returned."
  numResults: Int = 50
  "An array of internal Omail deployment statuses."
  statuses: [DeploymentStatusSearchEnum!] = []
  "Text match for deployment trackId."
  trackId: String
}

`;
