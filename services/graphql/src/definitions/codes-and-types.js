const { gql } = require('apollo-server-express');

module.exports = gql`

enum ContactTypeStatusCodeEnum {
  ACTIVE
  PRIMARY
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
  WAITING_REVIEW
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

type WebformViewCode {
  id: WebformViewCodeEnum! @apiValue(path: "Value")
  value: Int! @apiValue
  description: String! @apiValue
}

`;
