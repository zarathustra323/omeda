const Joi = require('@parameter1/joi');
const { validateAsync } = require('@parameter1/joi/utils');
const { getAsArray } = require('@parameter1/utils');
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
   * @param {boolean} [params.returnObjects=false] Whether to return full customer objects
   */
  async lookupByEmailAddress(params = {}) {
    const { emailAddress, productId, returnObjects } = await validateAsync(Joi.object({
      emailAddress: this.schema.emailAddress.required(),
      productId: this.schema.productId,
      returnObjects: this.schema.returnObjects,
    }).required(), params);

    const endpoint = productId
      ? `customer/email/${emailAddress}/productid/${productId}/*`
      : `customer/email/${emailAddress}/*`;

    const { data } = await this.client.get({ endpoint });
    const CustomerIds = getAsArray(data, 'Customers').map((customer) => customer.Id);
    if (returnObjects) {
      return Promise.all(CustomerIds.map((customerId) => this.lookupById({ customerId })));
    }
    return {
      CustomerIds,
      SubmissionId: data.SubmissionId,
    };
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
