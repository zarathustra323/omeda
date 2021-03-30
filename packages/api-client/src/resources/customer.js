const Joi = require('@parameter1/joi');
const { validateAsync } = require('@parameter1/joi/utils');
const OmedaApiResourceResponse = require('../response/resource');
const AbstractResource = require('./abstract');

class CustomerResource extends AbstractResource {
  /**
   * This API provides the ability look up customers using Email Address and an optional Product Id.
   * The response will include a list of customer records including the Customer Id(s)
   * and the Customer Lookup URL(s).
   *
   * @param {object} params
   * @param {string} params.emailAddress
   * @param {number} [params.productId]
   */
  async lookupByEmailAddress(params = {}) {
    const { emailAddress, productId } = await validateAsync(Joi.object({
      emailAddress: this.schema.emailAddress.required(),
      productId: this.schema.productId,
      returnObjects: this.schema.returnObjects,
    }).required(), params);

    const endpoint = productId
      ? `customer/email/${emailAddress}/productid/${productId}/*`
      : `customer/email/${emailAddress}/*`;

    const response = await this.client.get({ endpoint });
    const CustomerIds = response.getAsArray('Customers').map((customer) => customer.Id);
    return new OmedaApiResourceResponse({ data: { CustomerIds }, response });
  }

  /**
   * This API provides the ability look up a Customer by the Customer id.
   * The response will include basic Customer information.
   *
   * @param {object} params
   * @param {number} params.customerId
   */
  async lookupById(params = {}) {
    const { customerId } = await validateAsync(Joi.object({
      customerId: this.schema.customerId.required(),
    }).required(), params);
    const endpoint = `/customer/${customerId}/*`;
    return this.client.get({ endpoint });
  }
}

module.exports = CustomerResource;
