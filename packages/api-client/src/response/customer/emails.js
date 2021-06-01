const CustomerEmailEntity = require('../../entities/customer/email');
const ApiResourceResponse = require('../resource');

class CustomerEmailsResponse extends ApiResourceResponse {
  /**
   *
   * @param {object} params
   * @param {ApiClientResponse} params.response The client response.
   */
  constructor({ response } = {}) {
    const data = response.getAsArray('Emails').map((obj) => new CustomerEmailEntity(obj));
    super({ data, response });
  }

  /**
   * Loads the primary email address for the email response.
   * Will use the first primary (business) email address found (code 300),
   * otherwise will fall back to the first address on the record.
   *
   * If no email addresses are set, this will return `null`.
   *
   * @returns {CustomerEmailEntity|null} The primary email address entity or null.
   */
  getPrimary() {
    const { data } = this;
    if (!data.length) return null;
    const primary = data.find(({ EmailContactType }) => EmailContactType === 300);
    return primary || data[0];
  }
}

module.exports = CustomerEmailsResponse;
