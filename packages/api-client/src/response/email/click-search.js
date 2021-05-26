const ApiResourceResponse = require('../resource');
const DeploymentClickEntity = require('../../entities/click/deployment');

class EmailClickSearchResponse extends ApiResourceResponse {
  constructor({ response, resource } = {}) {
    const { json } = response;
    const data = json && json.TrackId ? new DeploymentClickEntity(response.json) : null;
    super({ data, response });
    this.resource = resource;
  }
}

module.exports = EmailClickSearchResponse;
