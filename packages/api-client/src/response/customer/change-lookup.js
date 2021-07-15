const CustomerChangeLookupEntity = require('../../entities/customer/change-lookup');
const ApiResourceResponse = require('../resource');

class CustomerChangeLookupResponse extends ApiResourceResponse {
  /**
   *
   * @param {object} params
   * @param {ApiClientResponse} params.response The client response.
   */
  constructor({ response } = {}) {
    const data = response.getAsArray('Customers').map((obj) => new CustomerChangeLookupEntity(obj));
    super({ data, response });
  }
}

module.exports = CustomerChangeLookupResponse;
