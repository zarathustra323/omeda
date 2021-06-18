const GraphQLJSON = require('graphql-type-json');
const merge = require('lodash.merge');
const pagination = require('@parameter1/graphql-mongodb-pagination/resolvers');
const GraphQLDateTime = require('../types/date-time');

const codesAndTypes = require('./codes-and-types');
const customer = require('./customer');
const demographic = require('./demographic');
const deploymentType = require('./deployment-type');
const email = require('./email');
const product = require('./product');

const { GraphQLJSONObject } = GraphQLJSON;

module.exports = merge(pagination, {
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
}, codesAndTypes, customer, demographic, deploymentType, email, product);
