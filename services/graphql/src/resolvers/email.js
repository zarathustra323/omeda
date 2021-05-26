module.exports = {
  /**
   *
   */
  Query: {
    /**
     *
     */
    async searchEmailClicks(_, { input }, { apiClient }) {
      const response = await apiClient.resource('email').searchClicks({
        startDate: input.startDate,
        endDate: input.endDate,
        deploymentName: input.deploymentName,
        trackId: input.trackId,
      });
      return response.data;
    },

    /**
     *
     */
    async searchEmailDeployments(_, { input }, { apiClient }) {
      const response = await apiClient.resource('email').searchDeployments({
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
