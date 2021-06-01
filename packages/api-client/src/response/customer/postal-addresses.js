const CustomerPostalAddressEntity = require('../../entities/customer/postal-address');
const ApiResourceResponse = require('../resource');

class CustomerPostalAddressesResponse extends ApiResourceResponse {
  /**
   *
   * @param {object} params
   * @param {ApiClientResponse} params.response The client response.
   */
  constructor({ response } = {}) {
    const data = response.getAsArray('Addresses').map((obj) => new CustomerPostalAddressEntity(obj));
    super({ data, response });
  }

  /**
   * Loads the primary postal address for this response.
   * Will use the first business address found (code 100),
   * then will check for an address with a company name,
   * otherwise will fall back to the first address on the record.
   *
   * If no postal addresss are set, this will return `null`.
   *
   * @returns {CustomerPostalAddressEntity|null} The primary postal address entity or null.
   */
  getPrimary() {
    const { data } = this;
    if (!data.length) return null;
    const primary = data.find(({ AddressContactType }) => AddressContactType === 100);
    if (primary) return primary;
    const withCompany = data.find(({ Company }) => Company);
    return withCompany || data[0];
  }
}

module.exports = CustomerPostalAddressesResponse;
