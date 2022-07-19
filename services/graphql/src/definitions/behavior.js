const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Query {
  "Finds all defined Behaviors for the current brand."
  behaviors: [Behavior!]!
  "Finds all defined Behavior Actions for the current brand."
  behaviorActions: [BehaviorAction!]!
  "Finds all defined Behavior Attributes for the current brand."
  behaviorAttributes: [BehaviorAttribute!]!
  "Finds all defined Behavior Categories for the current brand."
  behaviorCategories: [BehaviorCategory!]!
}

type Behavior {
  id: Int! @apiValue
  "The behavior action this behavior belongs to"
  action: BehaviorAction!
  "The name of the behavior"
  description: String! @apiValue
  "The categories this behavior belongs to"
  categories: [BehaviorCategory!]!
  alternateId: String @apiValue
  "A product relationship (not required)"
  product: Product
  status: BehaviorStatusCodeEnum @apiValue(path: "StatusCode")
}

type BehaviorCategory {
  id: Int! @apiValue
  description: String! @apiValue
  alternateId: String @apiValue
  status: BehaviorCategoryStatusCodeEnum @apiValue(path: "StatusCode")
  behaviors: [Behavior!]!
}

type BehaviorAction {
  id: Int! @apiValue
  description: String! @apiValue
  status: BehaviorActionStatusCodeEnum @apiValue(path: "StatusCode")
}

`;
