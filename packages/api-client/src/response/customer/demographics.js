const CustomerDemographicEntity = require('../../entities/customer/demographic');
const ApiResourceResponse = require('../resource');

class CustomerDemographicsResponse extends ApiResourceResponse {
  /**
   *
   * @param {object} params
   * @param {ApiClientResponse} params.response The client response.
   */
  constructor({ response } = {}) {
    const data = response.getAsArray('CustomerDemographics').map((obj) => new CustomerDemographicEntity(obj));
    super({ data, response });
  }
}

module.exports = CustomerDemographicsResponse;
