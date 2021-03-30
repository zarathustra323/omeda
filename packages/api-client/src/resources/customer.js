const Joi = require('@parameter1/joi');
const { validateAsync } = require('@parameter1/joi/utils');
const ApiSetResponse = require('../response/set');
const BasicCustomerResponse = require('../response/customer/basic');
const AbstractResource = require('./abstract');

class CustomerResource extends AbstractResource {
  /**
   * This API provides the ability look up customers using Email Address and an optional Product Id.
   * The response will include a list of customer records including the Customer Id(s)
   * and the Customer Lookup URL(s).
   *
   * @param {object} params
   * @param {string} params.emailAddress The customer's email address.
   * @param {number} [params.productId] An optional product ID.
   * @returns {Promise<ApiSetResponse>} A Set of the found customer IDs.
   */
  async lookupByEmailAddress(params = {}) {
    const { emailAddress, productId } = await validateAsync(Joi.object({
      emailAddress: this.schema.emailAddress.required(),
      productId: this.schema.productId,
    }).required(), params);

    const endpoint = productId
      ? `customer/email/${emailAddress}/productid/${productId}/*`
      : `customer/email/${emailAddress}/*`;

    const response = await this.client.get({ endpoint });
    const customerIds = response.getAsArray('Customers').map((customer) => customer.Id);
    return new ApiSetResponse({ data: customerIds, response });
  }

  /**
   * This API provides the ability look up a Customer by the Customer id.
   * The response will include basic Customer information.
   *
   * @param {object} params
   * @param {number} params.customerId
   * @returns {Promise<BasicCustomerResponse>}
   */
  async lookupById(params = {}) {
    const { customerId } = await validateAsync(Joi.object({
      customerId: this.schema.customerId.required(),
    }).required(), params);
    const endpoint = `/customer/${customerId}/*`;
    const response = await this.client.get({ endpoint });
    return new BasicCustomerResponse({ response });
  }
}

module.exports = CustomerResource;
