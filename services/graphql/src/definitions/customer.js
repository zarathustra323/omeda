const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Query {
  "Finds a single customer by customer ID."
  customerById(input: CustomerByIdQueryInput!): Customer!
  "Finds a single customer by encrypted customer ID."
  customerByEncyptedId(input: CustomerByEncryptedIdQueryInput!): Customer!
}

type Customer {
  id: Int! @value
  readerId: String @value
  encryptedCustomerId: String! @value
  salutation: String @value
  firstName: String @value
  middleName: String @value
  lastName: String @value
  suffix: String @value
  title: String @value
  gender: String @value
  promoCode: String @value
  signUpDate: Date @value
  changedDate: Date @value
  statusCode: CustomerStatusCode @codeOrType(instance: "CustomerStatusCode")
  mergeCode: CustomerMergeCode! @codeOrType(instance: "CustomerMergeCode")

  emailAddresses: [CustomerEmailAddress!]!
  externalIds: [CustomerExternalId!]!
  phoneNumbers: [CustomerPhoneNumber!]!
  postalAddresses: [CustomerPostalAddress!]!
}

type CustomerEmailAddress {
  id: Int! @value
  contactType: EmailAddressContactType! @codeOrType(instance: "EmailContactType", path: "EmailContactType")
  emailAddress: String! @value
  changedDate: Date! @value
  statusCode: ContactTypeStatusCode @codeOrType(instance: "ContactTypeStatusCode")
  hashedEmailAddress: String @value
}

type CustomerExternalId {
  id: String! @value
  namespace: String! @value
}

type CustomerPhoneNumber {
  id: String! @value
  contactType: PhoneNumberContactType! @codeOrType(instance: "PhoneContactType", path: "PhoneContactType")
  phoneNumber: String! @value
  extension: String @value
  changedDate: Date! @value
  statusCode: ContactTypeStatusCode @codeOrType(instance: "ContactTypeStatusCode")
}

type CustomerPostalAddress {
  id: Int! @value
  contactType: PostalAddressContactType! @codeOrType(instance: "AddressContactType", path: "AddressContactType")
  company: String @value
  street: String @value
  apartmentMailStop: String @value
  extraAddress: String @value
  city: String @value
  regionCode: String @value
  region: String @value
  postalCode: String @value
  countryCode: String @value
  country: String @value
  changedDate: Date! @value
  statusCode: ContactTypeStatusCode @codeOrType(instance: "ContactTypeStatusCode")
}

input CustomerByIdQueryInput {
  "The customer ID to lookup."
  id: Int!
  "Whether to fetch the newly activated customer if the provided ID is inactive."
  reQueryOnInactive: Boolean = true
}

input CustomerByEncryptedIdQueryInput {
  "The encrypted customer ID to lookup."
  id: String!
}

`;
