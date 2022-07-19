const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Query {
  "Finds all defined Behaviors for the current brand."
  behaviors: [Behavior!]!
  "Finds all defined Behavior Actions for the current brand."
  behaviorActions: [BehaviorAction!]!
}

type Behavior {
  id: Int! @apiValue
  "The behavior action this behavior belongs to"
  action: BehaviorAction!
  description: String! @apiValue
  alternateId: String @apiValue
  "A product relationship (not required)"
  product: Product
  status: BehaviorStatusCodeEnum @apiValue(path: "StatusCode")
}

type BehaviorAction {
  id: Int! @apiValue
  description: String! @apiValue
  status: BehaviorActionStatusCodeEnum @apiValue(path: "StatusCode")
}

`;
