/* eslint-disable no-param-reassign */
const { SchemaDirectiveVisitor } = require('apollo-server-express');
const { get } = require('@parameter1/utils');
const typesAndCodes = require('@parameter1/omeda-api-client/types-and-codes');

class CodeOrTypeDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    field.resolve = async (obj) => {
      const { name } = field;
      const path = this.args.path || `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
      const value = get(obj, path);
      const { instance } = this.args;
      const CodeOrType = typesAndCodes[instance];
      if (!CodeOrType) throw new Error(`No code or type class instance found for '${instance}'`);
      const code = new CodeOrType(value);
      return code.Value == null ? null : code;
    };
  }
}

module.exports = CodeOrTypeDirective;
