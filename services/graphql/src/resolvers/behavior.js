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
      const r = await loaders.brandProducts.load(ProductId);
      return r ? r.data : null;
    },
    /**
     *
     */
    async action({ ActionId }, _, { loaders }) {
      if (!ActionId) return null;
      const r = await loaders.brandBehaviorActions.load(ActionId);
      return r ? r.data : null;
    },
    /**
     *
     */
    async categories({ Category }, _, { loaders }) {
      if (!Category) return [];
      const r = await loaders.brandBehaviorCategories.loadMany(Category);
      return r.map(((o) => o.data));
    },
  },
  /**
   *
   */
  BehaviorCategory: {
    /**
     *
     */
    async behaviors({ data }, _, { loaders }) {
      const r = await loaders.brandBehaviors.loadMany(data.BehaviorId);
      return r.map((o) => o.data);
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
   * https://training.omeda.com/knowledge-base/api-store-behavior-attribute/#articleTOC_7
   */
  BehaviorAttributeTypeEnum: {
    DEFINED_VALUES: 1,
    OPEN_TEXT: 2,
    OPEN_TEXT_NUMBER: 3,
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
};
