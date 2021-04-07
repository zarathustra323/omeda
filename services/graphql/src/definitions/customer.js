const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Query {
  "Finds a single customer by customer ID."
  customerById(input: CustomerByIdQueryInput!): Customer!
  "Finds a single customer by encrypted customer ID."
  customerByEncyptedId(input: CustomerByEncryptedIdQueryInput!): Customer!
}

extend type Mutation {
  "Rapidly identifies (upserts) user data into an Omeda customer."
  rapidCustomerIdentification(input: RapidCustomerIdentificationMutationInput!): RapidCustomerIdentification!
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
  demographic: Demographic!
  demographicId: Int! @apiValue
  demographicType: DemographicType! @codeOrType(instance: "DemographicType")
  demographicAge: Int @apiValue
  "The demographic value object. Only applicable when \`valueId\` is present."
  value: DemographicValue
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

type RapidCustomerIdentification {
  id: Int! @apiValue(path: "CustomerId")
  encryptedCustomerId: String! @apiValue
  customer: Customer!
  orderId: Int! @apiValue
  transactionId: Int! @apiValue
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

input RapidCustomerIdentificationMutationInput {
  "The product ID to associate with this rapid identification."
  productId: Int!
  "The customer's email address."
  email: String!
  "First name of customer, up to 100 characters long"
  firstName: String
  "Last name of customer, up to 100 characters long"
  lastName: String
  "Job title, up to 100 characters long"
  title: String
  "The customer's company name."
  companyName: String
  "3-character country code"
  countryCode: String
  "For country_code=’USA’ or ‘CAN’, this must be the 2-character US state or Canadian code used by the postal service. Omeda also has region codes for other countries of the world"
  regionCode: String
  "ZIP code or postal code."
  postalCode: String
  "An optional input ID to use when identifying."
  inputId: Int
}

`;
