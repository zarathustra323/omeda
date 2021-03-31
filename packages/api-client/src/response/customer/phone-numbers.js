const CustomerPhoneEntity = require('../../entities/customer/phone');
const ApiResourceResponse = require('../resource');

class CustomerPhoneNumbersResponse extends ApiResourceResponse {
  /**
   *
   * @param {object} params
   * @param {ApiClientResponse} params.response The client response.
   */
  constructor({ response } = {}) {
    const data = response.getAsArray('PhoneNumbers').map((obj) => new CustomerPhoneEntity(obj));
    super({ data, response });
  }
}

module.exports = CustomerPhoneNumbersResponse;
