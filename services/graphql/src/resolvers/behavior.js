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
    /**
     *
     */
    async action({ ActionId }, _, { loaders }) {
      const response = await loaders.brandBehaviorActions.load(ActionId);
      return response.data;
    },
  },
  /**
   *
   */
  BehaviorActionStatusCodeEnum: {
    ACTIVE: 1,
    INACTIVE: 0,
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
    /**
     *
     */
    async behaviorActions(_, __, { repos }) {
      const data = await repos.brandBehaviorAction.find();
      const r = await data.toArray();
      return r.map((doc) => ({ ...doc, ...doc.data }));
    },
  },
};
