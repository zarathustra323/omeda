const createError = require('http-errors');
const paginatedResponse = require('../utils/paginated-reponse');

module.exports = {
  /**
   *
   */
  DeploymentType: {
    /**
     *
     */
    products({ Id }, { input }, { repos }) {
      const { pagination, sort } = input;
      const query = { 'data.DeploymentTypeId': Id };
      return paginatedResponse(repos.brandProduct.paginate({
        query,
        sort,
        ...pagination,
      }));
    },
  },

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
