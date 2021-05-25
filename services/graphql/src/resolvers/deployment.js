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
        deploymentName: input.deploymentName,
        deploymentTypeId: input.deploymentTypeId,
        numResults: input.numResults,
        statuses: input.statuses,
        trackId: input.trackId,
      });
      return response.data;
    },
  },
};
