const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Query {
  "Finds all defined Behaviors for the current brand."
  behaviors: [Behavior!]!
}

type Behavior {
  id: Int! @apiValue
  description: String! @apiValue
  alternateId: String @apiValue
}

`;
