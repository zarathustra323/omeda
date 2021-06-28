const ApiResourceResponse = require('../resource');
const EmailOptInStatusFilterEntity = require('../../entities/email/email-opt-in-status-filter');

class EmailOptInStatusResponse extends ApiResourceResponse {
  constructor({ emailAddress, response, resource } = {}) {
    const data = response.getAsArray('Filters').map((obj) => new EmailOptInStatusFilterEntity(obj));
    super({ data, response });
    this.resource = resource;
    this.emailAddress = response.get('EmailAddress') || emailAddress;
  }
}

module.exports = EmailOptInStatusResponse;
