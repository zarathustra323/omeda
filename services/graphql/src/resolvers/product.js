const { get } = require('@parameter1/utils');
const createError = require('http-errors');

module.exports = {
  /**
   *
   */
  Product: {
    /**
     *
     */
    async deploymentType({ DeploymentTypeId }, _, { loaders }) {
      if (!DeploymentTypeId) return null;
      const doc = await loaders.brandDeploymentTypes.load(DeploymentTypeId);
      return get(doc, 'data');
    },
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    async productById(_, { input }, { loaders }) {
      const { id, strict } = input;
      const doc = await loaders.brandProducts.load(id);
      if (doc) return doc.data;
      if (!doc && strict) throw createError(404, 'No product was found for the provided criteria.');
      return null;
    },
  },
};
