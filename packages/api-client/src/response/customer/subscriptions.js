const CustomerSubscriptionEntity = require('../../entities/customer/subscription');
const ApiResourceResponse = require('../resource');

class CustomerSubscriptionsResponse extends ApiResourceResponse {
  /**
   *
   * @param {object} params
   * @param {ApiClientResponse} params.response The client response.
   */
  constructor({ response } = {}) {
    const data = response.getAsArray('Subscriptions').map((obj) => new CustomerSubscriptionEntity(obj));
    super({ data, response });
  }
}

module.exports = CustomerSubscriptionsResponse;
