const BrandBehaviorActionEntity = require('../../../../entities/brand/behavior/action');
const ApiResourceResponse = require('../../../resource');

class BrandBehaviorActionLookupResponse extends ApiResourceResponse {
  /**
   *
   * @param {object} params
   * @param {ApiClientResponse} params.response The client response.
   * @param {CustomerResource} params.resource The customer API resource.
   */
  constructor({ response, resource } = {}) {
    const data = response.getAsArray('BehaviorAction').map((obj) => new BrandBehaviorActionEntity(obj));
    super({ data, response });
    this.resource = resource;
  }
}

module.exports = BrandBehaviorActionLookupResponse;
