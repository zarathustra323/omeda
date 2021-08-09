const CustomerPhoneEntity = require('../../entities/customer/phone');
const CustomerRelManyResponse = require('./rel-many');

class CustomerPhoneNumbersResponse extends CustomerRelManyResponse {
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

  /**
   * Loads the first, active fax number for this response.
   *
   * @returns {CustomerPhoneEntity|null} The phone entity or null.
   */
  getPrimaryFax() {
    return this.getPrimaryForType(240);
  }

  /**
   * Loads the primary number for this response, based on a contact type ID.
   * Will use the first active phone found (StatusCode=1) with the provided type,
   * otherwise will return null.
   *
   * @param {number} typeId The phone contact type ID, e.g. 240 for fax, 230 for mobile, etc
   * @returns {CustomerPhoneEntity|null} The phone entity or null.
   */
  getPrimaryForType(typeId) {
    const { data } = this;
    if (!data.length) return null;
    const fax = data
      .find(({ StatusCode, PhoneContactType }) => StatusCode === 1 && PhoneContactType === typeId);
    return fax || null;
  }

  /**
   * Loads the first, active mobile number for this response.
   *
   * @returns {CustomerPhoneEntity|null} The phone entity or null.
   */
  getPrimaryMobile() {
    return this.getPrimaryForType(230);
  }
}

module.exports = CustomerPhoneNumbersResponse;
