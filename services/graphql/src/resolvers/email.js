const { get } = require('@parameter1/utils');

module.exports = {
  /**
   *
   */
  EmailDeployment: {
    /**
     *
     */
    async deploymentType({ DeploymentTypeId }, _, { loaders }) {
      if (!DeploymentTypeId) return null;
      const doc = await loaders.brandDeploymentTypes.load(DeploymentTypeId);
      return get(doc, 'data');
    },
  },

  /**
   *
   */
  EmailDeploymentContentTypeEnum: {
    HTML: 'html',
    TEXT: 'text',
  },

  /**
   *
   */
  EmailDeploymentListItem: {
    /**
     *
     */
    async deployment(item, _, { apiClient }) {
      const { data } = await apiClient.resource('email').lookupDeploymentById({ trackId: item.TrackId });
      return data;
    },
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    async emailDeploymentById(_, { input }, { apiClient }) {
      const { data } = await apiClient.resource('email').lookupDeploymentById({ trackId: input.trackId });
      return data;
    },

    /**
     *
     */
    async emailDeploymentContentById(_, { input }, { apiClient }) {
      const response = await apiClient.resource('email').lookupEmailDeploymentContent({
        trackId: input.trackId,
        splitNumber: input.splitNumber,
        contentType: input.contentType,
      });
      return response.getBody() || null;
    },

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
