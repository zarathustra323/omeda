const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Query {
  "Finds a single customer by customer ID."
  customerById(input: CustomerByIdQueryInput!): Customer!
  "Finds a single customer by encrypted customer ID."
  customerByEncyptedId(input: CustomerByEncryptedIdQueryInput!): Customer!
}

type Customer {
  id: Int! @apiValue
  readerId: String @apiValue
  encryptedCustomerId: String! @apiValue
  salutation: String @apiValue
  firstName: String @apiValue
  middleName: String @apiValue
  lastName: String @apiValue
  suffix: String @apiValue
  title: String @apiValue
  gender: String @apiValue
  promoCode: String @apiValue
  signUpDate: Date @apiValue
  changedDate: Date @apiValue
  statusCode: CustomerStatusCode @codeOrType(instance: "CustomerStatusCode")
  mergeCode: CustomerMergeCode! @codeOrType(instance: "CustomerMergeCode")

  demographics: [CustomerDemographic!]!
  emailAddresses: [CustomerEmailAddress!]!
  externalIds: [CustomerExternalId!]!
  phoneNumbers: [CustomerPhoneNumber!]!
  postalAddresses: [CustomerPostalAddress!]!
}

type CustomerDemographic {
  id: Int! @apiValue
  demographicId: Int! @apiValue
  demographicType: DemographicType! @codeOrType(instance: "DemographicType")
  demographicAge: Int @apiValue
  demographic: Demographic!
  valueId: Int @apiValue
  valueText: String @apiValue
  valueDate: Date @apiValue
  writeInDesc: String @apiValue
  alternateId: String @apiValue
  changedDate: Date @apiValue
}

type CustomerEmailAddress {
  id: Int! @apiValue
  contactType: EmailAddressContactType! @codeOrType(instance: "EmailContactType", path: "EmailContactType")
  emailAddress: String! @apiValue
  changedDate: Date! @apiValue
  statusCode: ContactTypeStatusCode @codeOrType(instance: "ContactTypeStatusCode")
  hashedEmailAddress: String @apiValue
}

type CustomerExternalId {
  id: String! @apiValue
  namespace: String! @apiValue
}

type CustomerPhoneNumber {
  id: String! @apiValue
  contactType: PhoneNumberContactType! @codeOrType(instance: "PhoneContactType", path: "PhoneContactType")
  phoneNumber: String! @apiValue
  extension: String @apiValue
  changedDate: Date! @apiValue
  statusCode: ContactTypeStatusCode @codeOrType(instance: "ContactTypeStatusCode")
}

type CustomerPostalAddress {
  id: Int! @apiValue
  contactType: PostalAddressContactType! @codeOrType(instance: "AddressContactType", path: "AddressContactType")
  company: String @apiValue
  street: String @apiValue
  apartmentMailStop: String @apiValue
  extraAddress: String @apiValue
  city: String @apiValue
  regionCode: String @apiValue
  region: String @apiValue
  postalCode: String @apiValue
  countryCode: String @apiValue
  country: String @apiValue
  changedDate: Date! @apiValue
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
