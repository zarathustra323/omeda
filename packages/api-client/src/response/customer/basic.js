const BasicCustomerEntity = require('../../entities/customer/basic');
const ApiResourceResponse = require('../resource');

class BasicCustomerResponse extends ApiResourceResponse {
  /**
   *
   * @param {object} params
   * @param {ApiClientResponse} params.response The client response.
   */
  constructor({ response } = {}) {
    const data = new BasicCustomerEntity(response.json);
    super({ data, response });
  }
}

module.exports = BasicCustomerResponse;
