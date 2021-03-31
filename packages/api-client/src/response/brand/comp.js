const BrandComprehensiveEntity = require('../../entities/brand/comp');
const ApiResourceResponse = require('../resource');

class BrandComprehensiveResponse extends ApiResourceResponse {
  /**
   *
   * @param {object} params
   * @param {ApiClientResponse} params.response The client response.
   * @param {CustomerResource} params.resource The customer API resource.
   */
  constructor({ response, resource } = {}) {
    const data = new BrandComprehensiveEntity(response.json);
    super({ data, response });
    this.resource = resource;
  }
}

module.exports = BrandComprehensiveResponse;
