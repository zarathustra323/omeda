const { makeExecutableSchema } = require('apollo-server-express');
const resolvers = require('./resolvers');
const typeDefs = require('./definitions');
const schemaDirectives = require('./directives');

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives,
});
