const GraphQLJSON = require('graphql-type-json');
const GraphQLDate = require('@parameter1/graphql-type-date');
const merge = require('lodash.merge');

const codesAndTypes = require('./codes-and-types');
const customer = require('./customer');

const { GraphQLJSONObject } = GraphQLJSON;

module.exports = merge({
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
     *
     * @todo create generic brand repos that look up by brand id
     */
    async brandComprehensiveLookup(_, __, { brand, repos }) {
      const query = { _id: brand };
      return repos.brand.findOne({ query });
    },
  },
}, codesAndTypes, customer);
