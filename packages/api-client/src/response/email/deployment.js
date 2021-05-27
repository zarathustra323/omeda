const ApiResourceResponse = require('../resource');
const EmailDeploymentEntity = require('../../entities/deployment');

class EmailDeploymentResponse extends ApiResourceResponse {
  constructor({ response, resource } = {}) {
    const { json } = response;
    const data = json && json.TrackId ? new EmailDeploymentEntity(json) : null;
    super({ data, response });
    this.resource = resource;
  }
}

module.exports = EmailDeploymentResponse;
