const createError = require('http-errors');

module.exports = {
  /**
   *
   */
  Query: {
    /**
     *
     */
    async deploymentTypeById(_, { input }, { loaders }) {
      const { id, strict } = input;
      const doc = await loaders.brandDeploymentTypes.load(id);
      if (doc) return doc.data;
      if (!doc && strict) throw createError(404, 'No deployment type was found for the provided criteria.');
      return null;
    },
  },
};
