const Joi = require('@parameter1/joi');
const { validateAsync } = require('@parameter1/joi/utils');
const AbstractResource = require('./abstract');
const EmailClickSearchResponse = require('../response/email/click-search');
const EmailDeploymentSearchResponse = require('../response/email/deployment-search');
const dayjs = require('../dayjs');

class EmailResource extends AbstractResource {
  /**
   * This service retrieves Omail data related to clicks on links
   * in emails using various parameters.
   *
   * @link https://main.omeda.com/knowledge-base/email-clicks/
   * @param {object} params
   * @returns {Promise<EmailClickSearchResponse>}
   */
  async searchClicks(params = {}) {
    const {
      deploymentName,
      endDate,
      startDate,
      trackId,
    } = await validateAsync(Joi.object({
      endDate: Joi.date(),
      deploymentName: Joi.string().trim(),
      startDate: Joi.date(),
      trackId: Joi.string().trim(),
    }).required(), params);
    const endpoint = '/omail/click/search/*';

    const formatDate = (value) => dayjs(value).format('YYYY-MM-DD HH:mm');

    const body = {
      ...(startDate && { StartDate: formatDate(startDate) }),
      ...(endDate && { EndDate: formatDate(endDate) }),
      ...(deploymentName && { DeploymentName: deploymentName }),
      ...(trackId && { TrackId: trackId }),
    };
    const response = await this.client.post({ endpoint, body });
    return new EmailClickSearchResponse({ response, resource: this });
  }

  /**
   * This service retrieves a list of most recent deployments for a
   * given brand based on search parameters.
   *
   * @link https://main.omeda.com/knowledge-base/email-deployment-search/
   * @param {object} params
   * @returns {Promise<EmailDeploymentSearchResponse>} The matched deployment list items.
   */
  async searchDeployments(params = {}) {
    const {
      deploymentDateStart,
      deploymentDateEnd,
      deploymentDesignations,
      deploymentName,
      deploymentTypeId,
      enteredByOrAssignedTo,
      numResults,
      statuses,
      trackId,
    } = await validateAsync(Joi.object({
      deploymentDesignations: Joi.array().items(Joi.string()).default([]),
      deploymentDateStart: Joi.date(),
      deploymentDateEnd: Joi.date(),
      deploymentName: Joi.string().trim(),
      deploymentTypeId: Joi.number().min(1),
      enteredByOrAssignedTo: Joi.string().trim(),
      numResults: Joi.number().min(1).default(50),
      statuses: Joi.array().items(Joi.string()).default([]),
      trackId: Joi.string().trim(),
    }).required(), params);
    const endpoint = '/omail/deployment/search/*';
    const body = {
      ...(deploymentDateStart && { DeploymentDateStart: deploymentDateStart.toISOString() }),
      ...(deploymentDateEnd && { DeploymentDateEnd: deploymentDateEnd.toISOString() }),
      ...(deploymentDesignations.length && { DeploymentDesignations: deploymentDesignations }),
      ...(deploymentName && { DeploymentName: deploymentName }),
      ...(deploymentTypeId && { Type: deploymentTypeId }),
      ...(enteredByOrAssignedTo && { EnteredByOrAssignedTo: enteredByOrAssignedTo }),
      NumResults: numResults,
      ...(statuses.length && { Statuses: statuses }),
      ...(trackId && { TrackId: trackId }),
    };
    const response = await this.client.post({ endpoint, body });
    return new EmailDeploymentSearchResponse({ response, resource: this });
  }
}

module.exports = EmailResource;
