const Joi = require('@parameter1/joi');
const { validateAsync } = require('@parameter1/joi/utils');
const AbstractResource = require('./abstract');
const DeploymentSearchResponse = require('../response/deployment/search');

class EmailResource extends AbstractResource {
  /**
   * This service retrieves a list of most recent deployments for a
   * given brand based on search parameters.
   */
  async deploymentSearch(params = {}) {
    const {
      deploymentDesignations,
      deploymentName,
      deploymentTypeId,
      enteredByOrAssignedTo,
      numResults,
      statuses,
      trackId,
    } = await validateAsync(Joi.object({
      deploymentDesignations: Joi.array().items(Joi.string()).default([]),
      deploymentName: Joi.string().trim(),
      deploymentTypeId: Joi.number().min(1),
      enteredByOrAssignedTo: Joi.string().trim(),
      numResults: Joi.number().min(1).default(50),
      statuses: Joi.array().items(Joi.string()).default([]),
      trackId: Joi.string().trim(),
    }).required(), params);
    const endpoint = '/omail/deployment/search/*';
    const body = {
      ...(deploymentDesignations.length && { DeploymentDesignations: deploymentDesignations }),
      ...(deploymentName && { DeploymentName: deploymentName }),
      ...(deploymentTypeId && { Type: deploymentTypeId }),
      ...(enteredByOrAssignedTo && { EnteredByOrAssignedTo: enteredByOrAssignedTo }),
      NumResults: numResults,
      ...(statuses.length && { Statuses: statuses }),
      ...(trackId && { TrackId: trackId }),
    };
    const response = await this.client.post({ endpoint, body });
    return new DeploymentSearchResponse({ response, resource: this });
  }
}

module.exports = EmailResource;
