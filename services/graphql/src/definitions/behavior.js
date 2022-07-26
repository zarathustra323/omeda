const { gql } = require('apollo-server-express');

module.exports = gql`

"A behavior that can be tied to a user record (via CustomerBehavior). Comprised of a description, action, and optionally product and/or behavior categories"
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

type BehaviorAction {
  id: Int! @apiValue
  description: String! @apiValue
  status: BehaviorActionStatusCodeEnum @apiValue(path: "StatusCode")
}

type BehaviorCategory {
  id: Int! @apiValue
  description: String! @apiValue
  alternateId: String @apiValue
  status: BehaviorCategoryStatusCodeEnum @apiValue(path: "StatusCode")
  behaviors: [Behavior!]!
}

`;
