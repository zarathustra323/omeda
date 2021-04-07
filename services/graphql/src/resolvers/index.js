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
     *
     */
    async brandComprehensiveLookup(_, __, { repos }) {
      return repos.brand.findById();
    },
  },
}, codesAndTypes, customer);
