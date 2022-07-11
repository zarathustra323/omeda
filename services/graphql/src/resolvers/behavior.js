module.exports = {
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
