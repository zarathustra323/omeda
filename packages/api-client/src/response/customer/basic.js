const BasicCustomerEntity = require('../../entities/customer/basic');
const ApiResourceResponse = require('../resource');

class BasicCustomerResponse extends ApiResourceResponse {
  /**
   *
   * @param {object} params
   * @param {ApiClientResponse} params.response The client response.
   * @param {CustomerResource} params.resource The customer API resource.
   */
  constructor({ response, resource } = {}) {
    const data = new BasicCustomerEntity(response.json);
    super({ data, response });
    this.resource = resource;
  }

  /**
   * Retrieves the postal address from the API for this customer.
   */
  async postalAddresses() {
    return this.resource.lookupPostalAddresses({ customerId: this.get('Id') });
  }
}

module.exports = BasicCustomerResponse;
