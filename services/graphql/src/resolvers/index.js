const GraphQLJSON = require('graphql-type-json');
const merge = require('lodash.merge');
const GraphQLDateTime = require('../types/date-time');

const codesAndTypes = require('./codes-and-types');
const customer = require('./customer');
const demographic = require('./demographic');
const email = require('./email');

const { GraphQLJSONObject } = GraphQLJSON;

module.exports = merge({
  DateTime: GraphQLDateTime,
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
}, codesAndTypes, customer, demographic, email);
