const GraphQLJSON = require('graphql-type-json');

const { GraphQLJSONObject } = GraphQLJSON;

module.exports = {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,

  /**
   *
   */
  Mutation: {
    /**
     *
     */
    ping() {
      return 'pong';
    },
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    ping() {
      return 'pong';
    },
  },
};
