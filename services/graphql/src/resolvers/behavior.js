module.exports = {
  /**
   *
   */
  Behavior: {
    /**
     *
     */
    async product({ ProductId }, _, { loaders }) {
      if (!ProductId) return null;
      const response = await loaders.brandProducts.load(ProductId);
      return response ? response.data : null;
    },
  },
  /**
   *
   */
  BehaviorStatusCodeEnum: {
    ACTIVE: 1,
    INACTIVE: 0,
  },
  /**
   *
   */
  Query: {
    /**
     *
     */
    async behaviors(_, __, { apiClient }) {
      const response = await apiClient.resource('brand').behaviorLookup();
      return response.data;
    },
  },
};
