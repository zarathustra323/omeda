const CustomerSubscriptionEntity = require('../../entities/customer/subscription');
const CustomerRelManyResponse = require('./rel-many');

class CustomerSubscriptionsResponse extends CustomerRelManyResponse {
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
