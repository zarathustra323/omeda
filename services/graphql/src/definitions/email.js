const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Query {
  searchEmailClicks(input: SearchEmailClicksQueryInput!): EmailDeploymentClicks
  searchEmailDeployments(input: SearchEmailDeploymentsQueryInput = {}): [EmailDeploymentListItem!]!
}

type EmailDeploymentClicks {
  id: String! @apiValue(path: "TrackId")
  deploymentName: String! @apiValue
  sentDate: DateTime! @apiValue
  trackId: String! @apiValue
  splits: [EmailDeploymentClickSplit!]! @apiValue(path: "splits", as: ARRAY)
}

type EmailDeploymentClickSplit {
  split: String! @apiValue
  subjectLine: String! @apiValue
  links: [EmailDeploymentClickLink!]! @apiValue(path: "links", as: ARRAY)
}

type EmailDeploymentClickLink {
  totalClicks: Int! @apiValue
  linkURL: String! @apiValue
  clicks: [EmailDeploymentClickInfo!]! @apiValue(path: "clicks", as: ARRAY)
}

type EmailDeploymentClickInfo {
  numberOfClicks: Int! @apiValue
  clickDate: DateTime! @apiValue
  firstName: String @apiValue
  lastName: String @apiValue
  customerId: String @apiValue
  encryptedCustomerId: String @apiValue
  emailAddress: String! @apiValue
  keyword: String @apiValue
  category: String @apiValue
  categoryValue: String @apiValue
}

type EmailDeploymentListItem {
  id: String! @apiValue(path: "TrackId")
  createdBy: String! @apiValue
  createdDate: DateTime! @apiValue
  deploymentDesignation: DeploymentDesignation @codeOrType(instance: "DeploymentDesignation")
  deploymentName: String! @apiValue
  deploymentTypeId: Int! @apiValue
  deploymentTypeDescription: String! @apiValue
  deployment: EmailDeployment!
  finalApprover: String @apiValue
  owner: String! @apiValue
  scheduledDate: DateTime @apiValue
  sentDate: DateTime @apiValue
  status: DeploymentStatus! @codeOrType(instance: "DeploymentStatus")
  trackId: String! @apiValue
}

"""
Dates are only precise to the _minute_ (seconds and milliseconds will be ignored/truncated).
The end date is _exclusive_ meaning if a click occured on the exact end date, it will _not_ be included.
"""
input SearchEmailClicksQueryInput {
  "Text match for deployment name. Required if \`trackId\` is not present."
  deploymentName: String
  "Text match for deployment trackId. Required if \`deploymentName\` is not present."
  trackId: String
  "Deployments have been clicked after this date. Required if \`endDate\` is present."
  startDate: DateTime
  "Deployments have been clicked prior to this date. Required if \`startDate\` is present"
  endDate: DateTime
}

"""
Dates are only precise to the _minute_ (seconds and milliseconds will be ignored/truncated).
"""
input SearchEmailDeploymentsQueryInput {
  "Deployments have been sent after this date."
  deploymentDateStart: DateTime
  "Deployments have been sent prior to this date."
  deploymentDateEnd: DateTime
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
