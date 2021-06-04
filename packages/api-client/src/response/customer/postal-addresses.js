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
   * Will use the first primary address found (StatusCode=1),
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
    const primary = data.find(({ StatusCode }) => StatusCode === 1);
    if (primary) return primary;
    const withCompany = data.find(({ Company }) => Company);
    return withCompany || data[0];
  }

  /**
   * Finds the company name for this response.
   *
   * Will first attempt to load the company from the primary address.
   * Otherwise, will find the first address with a company name and return it.
   *
   * @returns {string|null}
   */
  getCompanyName() {
    const primary = this.getPrimary();
    if (!primary) return null;
    const { Company } = primary;
    if (Company) return Company;
    const address = this.data.find((addr) => addr.Company);
    return address ? address.Company : null;
  }
}

module.exports = CustomerPostalAddressesResponse;
