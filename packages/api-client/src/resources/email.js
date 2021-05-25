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
    const { statuses } = await validateAsync(Joi.object({
      statuses: Joi.array().items(Joi.string()).default([]),
    }).required(), params);
    const endpoint = '/omail/deployment/search/*';
    const body = {
      ...(statuses.length && { Statuses: statuses }),
    };
    const response = await this.client.post({ endpoint, body });
    return new DeploymentSearchResponse({ response, resource: this });
  }
}

module.exports = EmailResource;
