const Joi = require('@parameter1/joi');
const { validateAsync } = require('@parameter1/joi/utils');
const ApiSetResponse = require('../response/set');
const BasicCustomerResponse = require('../response/customer/basic');
const CustomerEmailsResponse = require('../response/customer/emails');
const CustomerPhoneNumbersResponse = require('../response/customer/phone-numbers');
const CustomerPostalAddressesResponse = require('../response/customer/postal-addresses');
const AbstractResource = require('./abstract');

class CustomerResource extends AbstractResource {
  /**
   * This API provides the ability look up customers using Email Address and an optional Product Id.
   * The response will include a list of customer records including the Customer Id(s)
   * and the Customer Lookup URL(s).
   *
   * @link https://main.omeda.com/knowledge-base/customer-lookup-by-email/
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
   * This API provides the ability look up a Customer by the Encrypted Customer id.
   * The response will include basic Customer information.
   *
   * @link https://main.omeda.com/knowledge-base/customer-lookup-by-encryptedcustomerid/
   * @param {object} params
   * @param {number} params.encryptedId
   * @returns {Promise<BasicCustomerResponse>} The basic Customer properties
   */
  async lookupByEncryptedId(params = {}) {
    const { encryptedId } = await validateAsync(Joi.object({
      encryptedId: this.schema.encryptedCustomerId.required(),
    }).required(), params);
    const endpoint = `/customer/${encryptedId}/encrypted/*`;
    const response = await this.client.get({ endpoint });
    return new BasicCustomerResponse({ response, resource: this });
  }

  /**
   * This API provides the ability look up a Customer by the Customer id.
   * The response will include basic Customer information.
   *
   * @link https://main.omeda.com/knowledge-base/customer-lookup-by-customer-id/
   * @param {object} params
   * @param {number} params.customerId
   * @returns {Promise<BasicCustomerResponse>} The basic Customer properties
   */
  async lookupById(params = {}) {
    const { customerId, reQueryOnInactive } = await validateAsync(Joi.object({
      customerId: this.schema.customerId.required(),
      reQueryOnInactive: Joi.boolean().default(true),
    }).required(), params);
    const endpoint = `/customer/${customerId}/*`;
    try {
      const response = await this.client.get({ endpoint });
      return new BasicCustomerResponse({ response, resource: this });
    } catch (e) {
      // on inactive, re-query.
      if (reQueryOnInactive) {
        const inactive = /^customer id \d+ is valid but not active.+please use (\d+)/i.exec(e.message);
        if (inactive && inactive[1]) {
          return this.lookupById({ customerId: parseInt(inactive[1], 10) });
        }
      }
      throw e;
    }
  }

  /**
   * This API provides the ability look up a Customer’s Email Addresses by the Customer Id.
   * This service returns all active email address information stored for the given customer.
   *
   * @link https://main.omeda.com/knowledge-base/email-address-lookup-by-customer-id/
   * @param {object} params
   * @param {number} params.customerId The customer ID to find emails for.
   * @param {boolean} [params.errorOnNotFound=false] Whether to error when not found.
   * @returns {Promise<CustomerEmailsResponse>} The customer emails.
   */
  async lookupEmails(params = {}) {
    const { customerId, errorOnNotFound } = await validateAsync(Joi.object({
      customerId: this.schema.customerId.required(),
      errorOnNotFound: Joi.boolean().default(false),
    }).required(), params);
    const endpoint = `/customer/${customerId}/email/*`;
    const response = await this.client.get({ endpoint, errorOnNotFound });
    return new CustomerEmailsResponse({ response });
  }

  /**
   * This API provides the ability look up a Customer’s Phone Numbers by the Customer id.
   *
   * @link https://main.omeda.com/knowledge-base/phone-lookup-by-customer-id/
   * @param {object} params
   * @param {number} params.customerId The customer ID to find phone numbers for.
   * @param {boolean} [params.errorOnNotFound=false] Whether to error when not found.
   * @returns {Promise<CustomerPhoneNumbersResponse>} The customer phone numbers.
   */
  async lookupPhoneNumbers(params = {}) {
    const { customerId, errorOnNotFound } = await validateAsync(Joi.object({
      customerId: this.schema.customerId.required(),
      errorOnNotFound: Joi.boolean().default(false),
    }).required(), params);
    const endpoint = `/customer/${customerId}/phone/*`;
    const response = await this.client.get({ endpoint, errorOnNotFound });
    return new CustomerPhoneNumbersResponse({ response });
  }

  /**
   * This API provides the ability look up a Customer’s Address by the Customer Id.
   * The response will return all active addresses stored for a given customer.
   *
   * @link https://main.omeda.com/knowledge-base/postal-address-lookup-by-customer-id/
   * @param {object} params
   * @param {number} params.customerId The customer ID to find postal addresses for.
   * @param {boolean} [params.errorOnNotFound=false] Whether to error when not found.
   * @returns {Promise<CustomerPostalAddressesResponse>} The customer addresses.
   */
  async lookupPostalAddresses(params = {}) {
    const { customerId, errorOnNotFound } = await validateAsync(Joi.object({
      customerId: this.schema.customerId.required(),
      errorOnNotFound: Joi.boolean().default(false),
    }).required(), params);
    const endpoint = `/customer/${customerId}/address/*`;
    const response = await this.client.get({ endpoint, errorOnNotFound });
    return new CustomerPostalAddressesResponse({ response });
  }
}

module.exports = CustomerResource;
