const Joi = require('@parameter1/joi');
const { validateAsync } = require('@parameter1/joi/utils');
const AbstractResource = require('./abstract');
const EmailClickSearchResponse = require('../response/email/click-search');
const EmailDeploymentResponse = require('../response/email/deployment');
const EmailDeploymentSearchResponse = require('../response/email/deployment-search');
const EmailOptInStatusResponse = require('../response/email/opt-in-status');
const formatDate = require('../utils/format-date');

class EmailResource extends AbstractResource {
  /**
   * The Deployment Lookup API provides the ability to retrieve deployment
   * information such as link tracking, delivery statistics, deployment status, history, etc.
   *
   * @link https://training.omeda.com/knowledge-base/api-email-deployment-lookup-resource/
   * @param {object} params
   * @param {string} params.trackId
   * @returns {Promise<EmailDeploymentResponse>}
   */
  async lookupDeploymentById(params = {}) {
    const {
      trackId,
    } = await validateAsync(Joi.object({
      trackId: Joi.string().trim().required(),
    }).required(), params);
    const endpoint = `/omail/deployment/lookup/${trackId}/*`;
    const response = await this.client.get({ endpoint });
    return new EmailDeploymentResponse({ response, resource: this });
  }

  /**
   * Looks up either the HTML or text content for the provided Track ID and split number.
   *
   * @param {object} params
   * @param {string} params.trackId
   * @param {number} params.splitNumber
   * @param {string} params.contentType One of either `html` or `text`
   * @param {boolean} [params.errorOnNotFound=false]
   * @returns {Promise<ApiClientTextResponse>}
   */
  async lookupEmailDeploymentContent(params = {}) {
    const {
      trackId,
      splitNumber,
      contentType,
      errorOnNotFound,
    } = await validateAsync(Joi.object({
      trackId: Joi.string().trim().required(),
      splitNumber: Joi.number().min(1).required(),
      contentType: Joi.string().trim().lowercase().valid('html', 'text')
        .required(),
      errorOnNotFound: Joi.boolean().default(false),
    }).required(), params);
    const endpoint = `/omail/deployment/content/lookup/${contentType}/${trackId}/${splitNumber}/*`;
    return this.client.get({ endpoint, errorOnNotFound });
  }

  /**
   * This service returns Opt In/Out information stored for a given email address.
   *
   * @link https://www.omeda.com/knowledge-base/email-opt-in-out-lookup/
   * @param {object} params
   * @param {string} params.emailAddress
   * @param {boolean} [params.errorOnNotFound=false]
   * @returns {Promise<EmailOptInStatusResponse>}
   */
  async lookupOptInStatusByEmail(params = {}) {
    const { emailAddress, errorOnNotFound } = await validateAsync(Joi.object({
      emailAddress: this.schema.emailAddress.required(),
      errorOnNotFound: Joi.boolean().default(false),
    }).required(), params);
    const endpoint = `/filter/email/${emailAddress}/*`;
    const response = await this.client.get({ endpoint, errorOnNotFound });
    return new EmailOptInStatusResponse({ emailAddress, response, resource: this });
  }

  /**
   * The OptIn Queue API allows our client to OptIn their subscribers or customers to
   * their email deployments at the deployment type level.
   *
   * @link https://www.omeda.com/knowledge-base/email-optin-queue/
   * @param {object} params
   * @param {object[]} params.optIns
   * @param {string} params.optIns.emailAddress
   * @param {number[]} params.optIns.deploymentTypeIds
   * @param {boolean} params.optIns.deleteOptOut
   * @param {string} [params.optIns.source]
   * @returns {Promise<object>}
   */
  async optIn(params = {}) {
    const { optIns } = await validateAsync(Joi.object({
      optIns: Joi.array().items(
        Joi.object({
          emailAddress: this.schema.emailAddress.required(),
          deploymentTypeIds: Joi.array().items(Joi.number().min(1)).required(),
          deleteOptOut: Joi.boolean().default(false),
          source: Joi.string().trim(),
        }),
      ).required(),
    }).required(), params);
    const endpoint = '/optinfilterqueue/*';
    const body = {
      DeploymentTypeOptIn: optIns.map((optIn) => {
        const { source, deleteOptOut } = optIn;
        return {
          EmailAddress: optIn.emailAddress,
          DeploymentTypeId: [...new Set(optIn.deploymentTypeIds)],
          DeleteOptOut: deleteOptOut ? 1 : 0,
          ...(source && { Source: source }),
        };
      }),
    };
    const response = await this.client.post({ endpoint, body, useClientUrl: true });
    return response;
  }

  /**
   * Opts-in a single email address to the provided deployment type IDs.
   *
   * @param {object} params
   * @param {string} params.emailAddress
   * @param {number[]} params.deploymentTypeIds
   * @param {boolean} params.deleteOptOut
   * @param {string} [params.source]
   * @returns {Promise<object>}
   */
  async optInEmailAddress(params = {}) {
    const optIn = await validateAsync(Joi.object({
      emailAddress: this.schema.emailAddress.required(),
      deploymentTypeIds: Joi.array().items(Joi.number().min(1)).required(),
      deleteOptOut: Joi.boolean().default(false),
      source: Joi.string().trim(),
    }).required(), params);
    return this.optIn({ optIns: [optIn] });
  }

  /**
   * The OptOut Queue API allows our client to OptOut their subscribers or customers to
   * their email deployments at the deployment type level.
   *
   * @link https://training.omeda.com/knowledge-base/api-email-optout-queue-service/
   * @param {object} params
   * @param {object[]} params.optIns
   * @param {string} params.optIns.emailAddress
   * @param {number[]} params.optIns.deploymentTypeIds
   * @param {boolean} params.optIns.deleteOptOut
   * @param {string} [params.optIns.source]
   * @returns {Promise<object>}
   */
  async optOut(params = {}) {
    const { optOuts } = await validateAsync(Joi.object({
      optOuts: Joi.array().items(
        Joi.object({
          emailAddress: this.schema.emailAddress.required(),
          deploymentTypeIds: Joi.array().items(Joi.number().min(1)).required(),
          source: Joi.string().trim(),
        }),
      ).required(),
    }).required(), params);
    const endpoint = '/optoutfilterqueue/*';
    const body = {
      DeploymentTypeOptOut: optOuts.map((optOut) => {
        const { source } = optOut;
        return {
          EmailAddress: optOut.emailAddress,
          DeploymentTypeId: [...new Set(optOut.deploymentTypeIds)],
          ...(source && { Source: source }),
        };
      }),
    };
    const response = await this.client.post({ endpoint, body, useClientUrl: true });
    return response;
  }

  /**
   * Opts-out a single email address from the provided deployment type IDs.
   *
   * @param {object} params
   * @param {string} params.emailAddress
   * @param {number[]} params.deploymentTypeIds
   * @param {string} [params.source]
   * @returns {Promise<object>}
   */
  async optOutEmailAddress(params = {}) {
    const optOut = await validateAsync(Joi.object({
      emailAddress: this.schema.emailAddress.required(),
      deploymentTypeIds: Joi.array().items(Joi.number().min(1)).required(),
      source: Joi.string().trim(),
    }).required(), params);
    return this.optOut({ optOuts: [optOut] });
  }

  /**
   * This service retrieves Omail data related to clicks on links
   * in emails using various parameters.
   *
   * @link https://main.omeda.com/knowledge-base/email-clicks/
   * @param {object} params
   * @param {string} [params.deploymentName]
   * @param {Date} [params.endDate] Will be converted to America/Chicago timezone.
   * @param {Date} [params.startDate] Will be converted to America/Chicago timezone.
   * @param {string} [params.trackId]
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
   * @param {Date} [params.deploymentDateStart] Will be converted to America/Chicago timezone.
   * @param {Date} [params.deploymentDateEnd] Will be converted to America/Chicago timezone.
   * @param {string[]} [params.deploymentDesignations]
   * @param {string} [params.deploymentName]
   * @param {number} [params.deploymentTypeId]
   * @param {string} [params.enteredByOrAssignedTo]
   * @param {number} [params.numResults=50]
   * @param {string[]} [params.statuses]
   * @param {string} [params.trackId]
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
      numResults: Joi.number().min(1).max(1000).default(50),
      statuses: Joi.array().items(Joi.string()).default([]),
      trackId: Joi.string().trim(),
    }).required(), params);
    const endpoint = '/omail/deployment/search/*';
    const body = {
      ...(deploymentDateStart && { DeploymentDateStart: formatDate(deploymentDateStart) }),
      ...(deploymentDateEnd && { DeploymentDateEnd: formatDate(deploymentDateEnd) }),
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
