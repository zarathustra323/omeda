const BrandBehaviorCategoryEntity = require('../../../../entities/brand/behavior/category');
const ApiResourceResponse = require('../../../resource');

class BrandBehaviorCategoryLookupResponse extends ApiResourceResponse {
  /**
   *
   * @param {object} params
   * @param {ApiClientResponse} params.response The client response.
   * @param {CustomerResource} params.resource The customer API resource.
   */
  constructor({ response, resource } = {}) {
    const data = response.getAsArray('BehaviorCategory').map((obj) => new BrandBehaviorCategoryEntity(obj));
    super({ data, response });
    this.resource = resource;
  }
}

module.exports = BrandBehaviorCategoryLookupResponse;
