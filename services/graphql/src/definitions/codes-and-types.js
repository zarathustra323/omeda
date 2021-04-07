const { gql } = require('apollo-server-express');

module.exports = gql`

enum CustomerStatusCodeEnum {
  ACTIVE
  DELETED_INACTIVE
  PROSPECT
}

enum CustomerMergeCodeEnum {
  MERGEABLE
  NON_MERGABLE
}

enum PostalAddressContactTypeEnum {
  BUSINESS
  HOME
  UNKNOWN
}

enum PostalAddressStatusCodeEnum {
  ACTIVE
  PRIMARY
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

type PostalAddressContactType {
  id: PostalAddressContactTypeEnum! @value(path: "Value")
  value: Int! @value
  description: String! @value
}

type PostalAddressStatusCode {
  id: PostalAddressStatusCodeEnum! @value(path: "Value")
  value: Int! @value
  description: String! @value
}

`;
