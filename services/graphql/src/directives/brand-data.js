/* eslint-disable no-param-reassign, class-methods-use-this */
const { SchemaDirectiveVisitor } = require('apollo-server-express');

class BrandDataDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    const { resolve } = field;
    field.resolve = async (...args) => {
      const [, , { apiClient, brand, repos }] = args;
      const hasData = await repos.brand.hasData({ brand });
      if (!hasData) {
        // refresh and save brand data from the API
        const response = await apiClient.resource('brand').comprehensiveLookup();
        await repos.brand.upsert({ brand: response.get('BrandAbbrev'), data: response.data });
      }
      if (typeof resolve === 'function') return resolve(...args);
      return null;
    };
  }
}

module.exports = BrandDataDirective;
