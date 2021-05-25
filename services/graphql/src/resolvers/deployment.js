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
        deploymentDesignations: input.deploymentDesignations,
        deploymentTypeId: input.deploymentTypeId,
        numResults: input.numResults,
        statuses: input.statuses,
      });
      return response.data;
    },
  },
};
