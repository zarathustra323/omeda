const BrandBehaviorAttributeEntity = require('../../../../entities/brand/behavior/attribute');
const ApiResourceResponse = require('../../../resource');

class BrandBehaviorAttributeLookupResponse extends ApiResourceResponse {
  /**
   *
   * @param {object} params
   * @param {ApiClientResponse} params.response The client response.
   * @param {CustomerResource} params.resource The customer API resource.
   */
  constructor({ response, resource } = {}) {
    const data = response.getAsArray('BehaviorAttributes').map((obj) => new BrandBehaviorAttributeEntity(obj));
    super({ data, response });
    this.resource = resource;
  }
}

module.exports = BrandBehaviorAttributeLookupResponse;
