const { gql } = require('apollo-server-express');

module.exports = gql`

enum BehaviorStatusCodeEnum {
  ACTIVE
  INACTIVE
}

enum ContactTypeStatusCodeEnum {
  ACTIVE
  PRIMARY
}

enum CustomerChangeStatusCodeEnum {
  ACTIVE
  INACTIVE
}

enum CustomerEmailAddressOptInStatusValueEnum {
  IN
  OUT
}

enum CustomerStatusCodeEnum {
  ACTIVE
  DELETED_INACTIVE
  PROSPECT
}

enum CustomerMergeCodeEnum {
  MERGEABLE
  NON_MERGABLE
}

enum DemographicTypeEnum {
  SINGLE_CHOICE
  MULTIPLE_CHOICE
  TEXT
  YES_NO
  DATE
  WHOLE_NUMBER
  DECIMAL
}

enum DemographicValueTypeEnum {
  OTHER
  NONE_OF_THE_ABOVE
  STANDARD
}

enum DeploymentDesignationEnum {
  ADVERTISER_PROMOTION
  AUDIENCE_PROMOTION
  DIGITAL_MAGAZINE
  LIVE_CONFERENCES
  MARKETING
  NEWSLETTER
  OTHER_COMMUNICATIONS
  RESEARCH
  THIRD_PARTY
  VIRTUAL_CONFERENCES
  WEBINAR
}

enum DeploymentStatusEnum {
  ACCEPTED
  APPROVED
  CANCELLED
  NEW
  NOT_ACCEPTED
  SCHEDULED
  SENDING
  SENT
  SUBMITTED
  UNSCHEDULING
  WAITING_REVIEW
}

enum DeploymentStatusSearchEnum {
  CANCELLED
  NEW
  SCHEDULED
  SENDING
  SENT
  SENT_OR_SENDING
  WAITING_REVIEW
}

enum DeploymentTypeStatusEnum {
  ACTIVE
  INACTIVE
}

enum EmailAddressContactTypeEnum {
  PRIMARY
  SECONDARY
  UNKNOWN
}

enum PhoneNumberContactTypeEnum {
  BUSINESS
  FAX
  FOREIGN
  FOREIGN_FAX
  HOME
  MOBILE
  PAGER
  UNKNOWN
}

enum PostalAddressContactTypeEnum {
  BUSINESS
  HOME
  UNKNOWN
}

enum ProductFrequencyTypeEnum {
  DAILY
  WEEKLY
  MONTHLY
  YEARLY
  BI_WEEKLY
  BI_MONTHLY
  MANUAL
}

enum ProductIssueStatusEnum {
  PLANNED
  OPEN
  LOCKED
  CLOSED
  CURRENT_SUPPLEMENT
  CURRENT_SUPPLEMENT_CLOSED
  IN_PROGRESS
  IN_PROGRESS_CLOSED
}

enum ProductMarketingClassStatusEnum {
  ACTIVE
  INACTIVE
}

enum ProductTypeEnum {
  MAGAZINE
  NEWSLETTER
  EVENT
  CATALOG
  EMAIL_DEPLOYMENT
  ASSOCIATION_MEMBERSHIP
  WEBSITE
  NEWSSTAND
  ACCOUNTING
  SALES
}

enum WebformViewCodeEnum {
  HIDDEN
  OPTIONAL
  REQUIRED
}

type ContactTypeStatusCode {
  id: ContactTypeStatusCodeEnum! @apiValue(path: "Value")
  value: Int! @apiValue
  description: String! @apiValue
}

type CustomerChangeStatusCode {
  id: CustomerChangeStatusCodeEnum! @apiValue(path: "Value")
  value: Int! @apiValue
  description: String! @apiValue
}

type CustomerEmailAddressOptInStatusValue {
  id: CustomerEmailAddressOptInStatusValueEnum! @apiValue(path: "Value")
  value: String! @apiValue
  description: String! @apiValue
}

type CustomerStatusCode {
  id: CustomerStatusCodeEnum! @apiValue(path: "Value")
  value: Int! @apiValue
  description: String! @apiValue
}

type CustomerMergeCode {
  id: CustomerMergeCodeEnum! @apiValue(path: "Value")
  value: Int! @apiValue
  description: String! @apiValue
}

type DemographicType {
  id: DemographicTypeEnum! @apiValue(path: "Value")
  value: Int! @apiValue
  description: String! @apiValue
}

type DemographicValueType {
  id: DemographicValueTypeEnum! @apiValue(path: "Value")
  value: Int! @apiValue
  description: String! @apiValue
}

type DeploymentDesignation {
  id: DeploymentDesignationEnum! @apiValue(path: "Value")
  value: String! @apiValue
  description: String! @apiValue
}

type DeploymentStatus {
  id: DeploymentStatusEnum! @apiValue(path: "Value")
  value: String! @apiValue
  description: String! @apiValue
}

type DeploymentTypeStatus {
  id: DeploymentTypeStatusEnum! @apiValue(path: "Value")
  value: Int! @apiValue
  description: String! @apiValue
}

type EmailAddressContactType {
  id: EmailAddressContactTypeEnum! @apiValue(path: "Value")
  value: Int! @apiValue
  description: String! @apiValue
}

type PhoneNumberContactType {
  id: PhoneNumberContactTypeEnum! @apiValue(path: "Value")
  value: Int! @apiValue
  description: String! @apiValue
}

type PostalAddressContactType {
  id: PostalAddressContactTypeEnum! @apiValue(path: "Value")
  value: Int! @apiValue
  description: String! @apiValue
}

type ProductFrequencyType {
  id: ProductFrequencyTypeEnum! @apiValue(path: "Value")
  value: String! @apiValue
  description: String! @apiValue
}

type ProductIssueStatus {
  id: ProductIssueStatusEnum! @apiValue(path: "Value")
  value: Int! @apiValue
  description: String! @apiValue
}

type ProductMarketingClassStatus {
  id: ProductMarketingClassStatusEnum! @apiValue(path: "Value")
  value: String @apiValue
  description: String! @apiValue
}

type ProductType {
  id: ProductTypeEnum! @apiValue(path: "Value")
  value: Int! @apiValue
  description: String! @apiValue
}

type WebformViewCode {
  id: WebformViewCodeEnum! @apiValue(path: "Value")
  value: Int! @apiValue
  description: String! @apiValue
}

`;
