const formatDateDirectives = require('@parameter1/graphql-directive-format-date/directives');
const BrandDataDirective = require('./brand-data');
const CodeOrTypeDirective = require('./code-or-type');
const ValueDirective = require('./value');

module.exports = {
  ...formatDateDirectives.classes,
  brandData: BrandDataDirective,
  codeOrType: CodeOrTypeDirective,
  value: ValueDirective,
};
