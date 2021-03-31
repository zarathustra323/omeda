const CustomerBehaviorEntity = require('../../entities/customer/behavior');
const ApiResourceResponse = require('../resource');

class CustomerBehaviorsResponse extends ApiResourceResponse {
  /**
   *
   * @param {object} params
   * @param {ApiClientResponse} params.response The client response.
   */
  constructor({ response } = {}) {
    const data = response.getAsArray('Behaviors').map((obj) => new CustomerBehaviorEntity(obj));
    super({ data, response });
  }
}

module.exports = CustomerBehaviorsResponse;
