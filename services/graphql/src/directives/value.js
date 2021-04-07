/* eslint-disable no-param-reassign */
const { SchemaDirectiveVisitor } = require('apollo-server-express');
const { get, getAsArray, getAsObject } = require('@parameter1/utils');

class ValueDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    field.resolve = async (obj) => {
      const { name } = field;
      const path = this.args.path || `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
      switch (this.args.as) {
        case 'ARRAY':
          return getAsArray(obj, path);
        case 'OBJECT':
          return getAsObject(obj, path);
        default:
          return get(obj, path);
      }
    };
  }
}

module.exports = ValueDirective;
