const CustomerEmailEntity = require('../../entities/customer/email');
const CustomerRelManyResponse = require('./rel-many');
const attributes = require('../../attributes');

class CustomerEmailsResponse extends CustomerRelManyResponse {
  /**
   *
   * @param {object} params
   * @param {ApiClientResponse} params.response The client response.
   */
  constructor({ response } = {}) {
    const data = response.getAsArray('Emails')
      .filter(({ EmailAddress }) => {
        // filter out invalid email addresses
        const { error } = attributes.emailAddress.validate(EmailAddress);
        return !error;
      })
      .map((obj) => new CustomerEmailEntity(obj));
    super({ data, response });
  }

  /**
   * Loads the primary email address for the email response.
   * Will use the first primary email address found (StatusCode=1),
   * otherwise will fall back to the first address on the record.
   *
   * If no email addresses are set, this will return `null`.
   *
   * @returns {CustomerEmailEntity|null} The primary email address entity or null.
   */
  getPrimary() {
    const { data } = this;
    if (!data.length) return null;
    const primary = data.find(({ StatusCode }) => StatusCode === 1);
    return primary || data[0];
  }
}

module.exports = CustomerEmailsResponse;
