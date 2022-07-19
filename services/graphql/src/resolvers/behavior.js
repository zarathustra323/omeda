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
    /**
     *
     */
    async categories({ Category }, _, { repos }) {
      if (!Category) return [];
      const data = await repos.brandBehaviorCategory.find({ query: { 'data.Id': { $in: Category } } });
      const r = await data.toArray();
      return r.map((doc) => ({ ...doc, ...doc.data }));
    },
  },

  /**
   *
   */
  BehaviorCategory: {
    /**
     *
     */
    async behaviors({ BehaviorId }, _, { repos }) {
      const data = await repos.brandBehavior.find({ query: { 'data.Id': { $in: BehaviorId } } });
      const r = await data.toArray();
      return r.map((doc) => ({ ...doc, ...doc.data }));
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
  BehaviorCategoryStatusCodeEnum: {
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
    async behaviors(_, __, { repos }) {
      const data = await repos.brandBehavior.find();
      const r = await data.toArray();
      return r.map((doc) => ({ ...doc, ...doc.data }));
    },
    /**
     *
     */
    async behaviorCategories(_, __, { repos }) {
      const data = await repos.brandBehaviorCategory.find();
      const r = await data.toArray();
      return r.map((doc) => ({ ...doc, ...doc.data }));
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
