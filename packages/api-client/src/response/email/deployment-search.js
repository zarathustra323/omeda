const { getAsArray } = require('@parameter1/utils');
const ApiResourceResponse = require('../resource');
const DeploymentListEntity = require('../../entities/deployment/list');

class EmailDeploymentSearchResponse extends ApiResourceResponse {
  constructor({ response, resource } = {}) {
    const data = getAsArray(response, 'json.Deployments').map((o) => new DeploymentListEntity(o));
    super({ data, response });
    this.resource = resource;
  }
}

module.exports = EmailDeploymentSearchResponse;
