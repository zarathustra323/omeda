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

type ContactTypeStatusCode {
  id: ContactTypeStatusCodeEnum! @value(path: "Value")
  value: Int! @value
  description: String! @value
}

type CustomerStatusCode {
  id: CustomerStatusCodeEnum! @value(path: "Value")
  value: Int! @value
  description: String! @value
}

type CustomerMergeCode {
  id: CustomerMergeCodeEnum! @value(path: "Value")
  value: Int! @value
  description: String! @value
}

type DemographicType {
  id: DemographicTypeEnum! @value(path: "Value")
  value: Int! @value
  description: String! @value
}

type EmailAddressContactType {
  id: EmailAddressContactTypeEnum! @value(path: "Value")
  value: Int! @value
  description: String! @value
}

type PhoneNumberContactType {
  id: PhoneNumberContactTypeEnum! @value(path: "Value")
  value: Int! @value
  description: String! @value
}

type PostalAddressContactType {
  id: PostalAddressContactTypeEnum! @value(path: "Value")
  value: Int! @value
  description: String! @value
}

`;
