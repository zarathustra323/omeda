const BrandBehaviorEntity = require('../../../entities/brand/behavior');
const ApiResourceResponse = require('../../resource');

class BrandBehaviorLookupResponse extends ApiResourceResponse {
  /**
   *
   * @param {object} params
   * @param {ApiClientResponse} params.response The client response.
   * @param {CustomerResource} params.resource The customer API resource.
   */
  constructor({ response, resource } = {}) {
    const data = response.getAsArray('Behavior').map((obj) => new BrandBehaviorEntity(obj));
    super({ data, response });
    this.resource = resource;
  }
}

module.exports = BrandBehaviorLookupResponse;
