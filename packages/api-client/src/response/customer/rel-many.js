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
    this.hasData = Boolean(matches && matches[1]);
    this.customerId = this.hasData ? parseInt(matches[1], 10) : null;
  }
}

module.exports = CustomerRelManyResponse;
