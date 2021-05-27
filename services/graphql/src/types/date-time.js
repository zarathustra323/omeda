const { GraphQLScalarType } = require('graphql');
const dayjs = require('../dayjs');

const createError = (value) => new TypeError(`The provided value "${value}" is not a valid date string.`);

const parseDate = (value) => {
  if (!value || typeof value !== 'string') throw createError(value);
  if (/^\d+$/.test(value)) throw createError(value);
  return dayjs.tz(value).toDate();
};

module.exports = new GraphQLScalarType({
  name: 'DateTime',
  description: 'DateTime type that serializes Date objects to ISO strings, and requires string input.',
  parseValue(value) {
    return parseDate(value);
  },
  serialize(value) {
    if (value instanceof Date) return value.toISOString();
    return null;
  },
  parseLiteral(ast) {
    return parseDate(ast.value);
  },
});
