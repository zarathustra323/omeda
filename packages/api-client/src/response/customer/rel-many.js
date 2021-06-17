const ApiResourceResponse = require('../resource');

const customerIdPattern = /customer\/([0-9]+)\/\*$/i;

class CustomerRelManyResponse extends ApiResourceResponse {
  /**
   *
   * @param {object} params
   * @param {object|array} params.data
   * @param {ApiClientResponse} params.response The client response.
   */
  constructor({ data, response } = {}) {
    super({ data, response });
    const matches = customerIdPattern.exec(response.json.Customer);
    if (!matches && !matches[1]) throw new Error('Unable to extract a customer ID from the customer rel response.');
    const customerId = parseInt(matches[1], 10);
    this.customerId = customerId;
  }
}

module.exports = CustomerRelManyResponse;
