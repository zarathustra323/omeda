const CustomerEmailEntity = require('../../entities/customer/email');
const ApiResourceResponse = require('../resource');

class CustomerEmailsResponse extends ApiResourceResponse {
  /**
   *
   * @param {object} params
   * @param {ApiClientResponse} params.response The client response.
   */
  constructor({ response } = {}) {
    const data = response.getAsArray('Emails').map((obj) => new CustomerEmailEntity(obj));
    super({ data, response });
  }
}

module.exports = CustomerEmailsResponse;
