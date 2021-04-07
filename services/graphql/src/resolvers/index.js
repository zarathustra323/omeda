const GraphQLJSON = require('graphql-type-json');
const GraphQLDate = require('@parameter1/graphql-type-date');

const { GraphQLJSONObject } = GraphQLJSON;

module.exports = {
  Date: GraphQLDate,
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

    /**
     * @todo need to handle "hydration" more generically with api entities
     * For now, save the data raw (E.g. the parsed json from the api)
     */
    async brandComprehensiveLookup(_, __, { brand, repos }) {
      return repos.brand.findOne({ _id: brand });
    },
  },
};
