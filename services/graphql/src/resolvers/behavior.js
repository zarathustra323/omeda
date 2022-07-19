module.exports = {
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
