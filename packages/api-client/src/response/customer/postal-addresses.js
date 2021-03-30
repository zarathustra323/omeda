const CustomerPostalAddressEntity = require('../../entities/customer/postal-address');
const ApiResourceResponse = require('../resource');

class CustomerPostalAddressesResponse extends ApiResourceResponse {
  /**
   *
   * @param {object} params
   * @param {ApiClientResponse} params.response The client response.
   */
  constructor({ response } = {}) {
    const data = response.getAsArray('Addresses').map((obj) => new CustomerPostalAddressEntity(obj));
    super({ data, response });
  }
}

module.exports = CustomerPostalAddressesResponse;
