const AbstractResource = require('./abstract');
const DeploymentSearchResponse = require('../response/deployment/search');

class EmailResource extends AbstractResource {
  /**
   * This service retrieves a list of most recent deployments for a
   * given brand based on search parameters.
   */
  async deploymentSearch(params = {}) {
    const endpoint = '/omail/deployment/search/*';
    const body = {};
    const response = await this.client.post({ endpoint, body });
    return new DeploymentSearchResponse({ response, resource: this });
  }
}

module.exports = EmailResource;
