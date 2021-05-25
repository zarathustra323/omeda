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
        deploymentDateStart: input.deploymentDateStart,
        deploymentDateEnd: input.deploymentDateEnd,
        deploymentDesignations: input.deploymentDesignations,
        deploymentName: input.deploymentName,
        deploymentTypeId: input.deploymentTypeId,
        enteredByOrAssignedTo: input.enteredByOrAssignedTo,
        numResults: input.numResults,
        statuses: input.statuses,
        trackId: input.trackId,
      });
      return response.data;
    },
  },
};
