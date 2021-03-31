const CustomerExternalIdEntity = require('../../entities/customer/external-id');
const ApiResourceResponse = require('../resource');

class CustomerExternalIdsResponse extends ApiResourceResponse {
  /**
   *
   * @param {object} params
   * @param {ApiClientResponse} params.response The client response.
   */
  constructor({ response } = {}) {
    const data = response.getAsArray('ExternalIds').map((obj) => new CustomerExternalIdEntity(obj));
    super({ data, response });
  }
}

module.exports = CustomerExternalIdsResponse;
