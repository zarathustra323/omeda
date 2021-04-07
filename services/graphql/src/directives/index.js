const formatDateDirectives = require('@parameter1/graphql-directive-format-date/directives');
const BrandDataDirective = require('./brand-data');

module.exports = {
  ...formatDateDirectives.classes,
  brandData: BrandDataDirective,
};
