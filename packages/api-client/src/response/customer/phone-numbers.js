const CustomerPhoneEntity = require('../../entities/customer/phone');
const ApiResourceResponse = require('../resource');

class CustomerPhoneNumbersResponse extends ApiResourceResponse {
  /**
   *
   * @param {object} params
   * @param {ApiClientResponse} params.response The client response.
   */
  constructor({ response } = {}) {
    const data = response.getAsArray('PhoneNumbers').map((obj) => new CustomerPhoneEntity(obj));
    super({ data, response });
  }

  /**
   * Loads the primary phone number for this response.
   * Will use the first primary phone found (StatusCode=1),
   * otherwise will fall back to the first number on the record.
   *
   * If no phone numbers are set, this will return `null`.
   *
   * @returns {CustomerPhoneEntity|null} The primary phone entity or null.
   */
  getPrimary() {
    const { data } = this;
    if (!data.length) return null;
    const primary = data.find(({ StatusCode }) => StatusCode === 1);
    return primary || data[0];
  }
}

module.exports = CustomerPhoneNumbersResponse;
