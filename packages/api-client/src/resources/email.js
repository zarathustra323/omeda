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
      deploymentTypeId,
      numResults,
      statuses,
    } = await validateAsync(Joi.object({
      deploymentDesignations: Joi.array().items(Joi.string()).default([]),
      deploymentTypeId: Joi.number().min(1),
      numResults: Joi.number().min(1).default(50),
      statuses: Joi.array().items(Joi.string()).default([]),
    }).required(), params);
    const endpoint = '/omail/deployment/search/*';
    const body = {
      ...(deploymentDesignations.length && { DeploymentDesignations: deploymentDesignations }),
      ...(deploymentTypeId && { Type: deploymentTypeId }),
      NumResults: numResults,
      ...(statuses.length && { Statuses: statuses }),
    };
    const response = await this.client.post({ endpoint, body });
    return new DeploymentSearchResponse({ response, resource: this });
  }
}

module.exports = EmailResource;
