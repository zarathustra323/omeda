const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Query {
  "Finds all customers that have changed for the provided date range."
  changedCustomers(input: ChangedCustomersQueryInput!): [ChangedCustomer!]!
  "Finds a single customer by customer ID."
  customerById(input: CustomerByIdQueryInput!): Customer!
  "Finds a single customer by encrypted customer ID."
  customerByEncyptedId(input: CustomerByEncryptedIdQueryInput!): Customer!
  "Finds all customers by the provided email address."
  customersByEmailAddress(input: CustomersByEmailAddressQueryInput!): [Customer!]!
}

extend type Mutation {
  "Rapidly identifies (upserts) user data into an Omeda customer."
  rapidCustomerIdentification(input: RapidCustomerIdentificationMutationInput!): RapidCustomerIdentification!
}

type ChangedCustomer {
  id: Int! @apiValue
  dateChanged: DateTime! @apiValue
  createdDate: DateTime! @apiValue
  customerStatusCode: CustomerChangeStatusCode! @codeOrType(instance: "CustomerChangeStatusCode", path: "CustomerStatusId")

  customer: Customer!
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
  signUpDate: DateTime @apiValue
  changedDate: DateTime @apiValue
  statusCode: CustomerStatusCode @codeOrType(instance: "CustomerStatusCode")
  mergeCode: CustomerMergeCode! @codeOrType(instance: "CustomerMergeCode")

  demographics(input: CustomerDemographicsInput = {}): [CustomerDemographic!]!
  emailAddresses: [CustomerEmailAddress!]!
  externalIds: [CustomerExternalId!]!
  phoneNumbers: [CustomerPhoneNumber!]!
  postalAddresses: [CustomerPostalAddress!]!
  subscriptions: [CustomerSubscription!]!

  primaryEmailAddress: CustomerEmailAddress
  primaryPhoneNumber: CustomerPhoneNumber
  primaryPostalAddress: CustomerPostalAddress

  companyName: String
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
  valueDate: DateTime @apiValue
  writeInDesc: String @apiValue
  alternateId: String @apiValue
  changedDate: DateTime @apiValue
}

type CustomerEmailAddress {
  id: Int! @apiValue
  contactType: EmailAddressContactType! @codeOrType(instance: "EmailContactType", path: "EmailContactType")
  emailAddress: String! @apiValue
  changedDate: DateTime! @apiValue
  statusCode: ContactTypeStatusCode @codeOrType(instance: "ContactTypeStatusCode")
  hashedEmailAddress: String @apiValue
  optInStatus: [CustomerEmailAddressOptInStatus!]!
}

type CustomerEmailAddressOptInStatus {
  brand: String! @apiValue
  deploymentTypeId: Int! @apiValue
  deploymentType: DeploymentType!
  status: String! @apiValue
  source: String @apiValue
  createdDate: DateTime @apiValue
  changedDate: DateTime @apiValue
}

type CustomerExternalId {
  id: String! @apiValue
  namespace: String! @apiValue
}

type CustomerPhoneNumber {
  id: Int! @apiValue
  contactType: PhoneNumberContactType! @codeOrType(instance: "PhoneContactType", path: "PhoneContactType")
  phoneNumber: String! @apiValue
  extension: String @apiValue
  changedDate: DateTime! @apiValue
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
  changedDate: DateTime! @apiValue
  statusCode: ContactTypeStatusCode @codeOrType(instance: "ContactTypeStatusCode")
}

type CustomerSubscription {
  id: Int! @apiValue
  product: Product!
  changedDate: DateTime! @apiValue
  receive: Boolean! @apiValue
}

type RapidCustomerIdentification {
  id: Int! @apiValue(path: "CustomerId")
  encryptedCustomerId: String! @apiValue
  customer: Customer!
  orderId: Int! @apiValue
  transactionId: Int! @apiValue
}

input ChangedCustomersQueryInput {
  "The start date for returning changed customers."
  startDate: DateTime!
  "The end date for returning changed customers."
  endDate: DateTime!
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

input CustomersByEmailAddressQueryInput {
  "The email address to lookup."
  emailAddress: String!
  "An (optional) product ID to filter the response by."
  productId: Int
}

input CustomerDemographicsInput {
  "Filters the customer demographics by one or more demographic IDs. An empty value will return all customer demographics."
  demographicIds: [Int!] = []
  "Filters the customer demographics by one or more demographic types. An empty value will return all customer demographics."
  demographicTypes: [DemographicTypeEnum!] = []
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
  "The customer's primary phone number."
  phoneNumber: String
  "Deployment types to assign to the customer."
  deploymentTypeIds: [Int!] = []
  "Demographics to assign to the customer."
  demographics: [RapidCustomerIdentificationDemographicInput!] = []
  "An optional input ID to use when identifying."
  inputId: Int
}

input RapidCustomerIdentificationDemographicInput {
  "The demographic ID to assign."
  id: Int!
  "The values to set."
  values: [String!]!
}

`;
