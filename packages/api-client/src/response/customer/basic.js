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
   * Retrieves the customer's behaviors from the API.
   *
   * @param {object} params
   * @param {number} [params.behaviorId] An optional behavior ID to filter by.
   */
  async behaviors({ behaviorId } = {}) {
    return this.resource.lookupBehaviors({ customerId: this.get('Id'), behaviorId });
  }

  /**
   * Retrieves the customer's demographics from the API.
   */
  async demographics() {
    return this.resource.lookupDemographics({ customerId: this.get('Id') });
  }

  /**
   * Retrieves the customer's email addresses from the API.
   */
  async emails() {
    return this.resource.lookupEmails({ customerId: this.get('Id') });
  }

  /**
   * Retrieves the customer's external identifiers from the API.
   */
  async externalIds() {
    return this.resource.lookupExternalIds({ customerId: this.get('Id') });
  }

  /**
   * Retrieves the customer's merge history from the API.
   */
  async mergeHistory() {
    return this.resource.lookupMergeHistory({ customerId: this.get('Id') });
  }

  /**
   * Retrieves the customer's phone numbers from the API.
   */
  async phoneNumbers() {
    return this.resource.lookupPhoneNumbers({ customerId: this.get('Id') });
  }

  /**
   * Retrieves the customer's postal addresses from the API.
   */
  async postalAddresses() {
    return this.resource.lookupPostalAddresses({ customerId: this.get('Id') });
  }

  /**
   * Retrieves the customer's subscriptions from the API.
   *
   * @param {object} params
   * @param {number} [params.productId] An optional product ID to filter by.
   */
  async subscriptions({ productId } = {}) {
    return this.resource.lookupSubscriptions({ customerId: this.get('Id'), productId });
  }
}

module.exports = BasicCustomerResponse;
