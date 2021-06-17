const CustomerDemographicEntity = require('../../entities/customer/demographic');
const CustomerRelManyResponse = require('./rel-many');

class CustomerDemographicsResponse extends CustomerRelManyResponse {
  /**
   *
   * @param {object} params
   * @param {ApiClientResponse} params.response The client response.
   */
  constructor({ response } = {}) {
    const data = response.getAsArray('CustomerDemographics').map((obj) => new CustomerDemographicEntity(obj));
    super({ data, response });
  }
}

module.exports = CustomerDemographicsResponse;
