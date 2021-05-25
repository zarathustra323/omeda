module.exports = {
  /**
   *
   */
  Query: {
    /**
     *
     */
    async emailDeploymentSearch(_, __, { apiClient }) {
      const response = await apiClient.resource('email').deploymentSearch({});
      return response.data;
    },
  },
};
