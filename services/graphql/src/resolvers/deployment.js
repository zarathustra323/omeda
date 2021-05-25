module.exports = {
  /**
   *
   */
  Query: {
    /**
     *
     */
    async emailDeploymentSearch(_, { input }, { apiClient }) {
      const response = await apiClient.resource('email').deploymentSearch({
        statuses: input.statuses,
      });
      return response.data;
    },
  },
};
