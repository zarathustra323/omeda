const { cleanPath, get } = require('@parameter1/utils');
const fetch = require('node-fetch');
const CustomerResource = require('./resources/customer');

class OmedaApiClient {
  /**
   *
   * @param {object} params
   * @param {string} params.appId The Omeda API app ID. Required.
   * @param {string} params.brand The brand abbreviation. Required.
   * @param {string} [params.inputId] The Omeda API input ID. Required when doing write calls.
   * @param {string} [params.useStaging=false] Whether to use the staging API.
   */
  constructor({
    appId,
    brand,
    inputId,
    useStaging = false,
  } = {}) {
    if (!appId) throw new Error('The Omeda API App ID is required.');
    if (!brand) throw new Error('The Omeda brand abbreviation is required.');
    this.appId = appId;
    this.brand = brand;
    this.inputId = inputId;
    this.useStaging = useStaging;

    this.customer = new CustomerResource({ client: this });
  }

  /**
   * Gets the API host name.
   *
   * @returns {string}
   */
  get host() {
    const root = this.useStaging ? 'omedastaging' : 'omeda';
    return `ows.${root}.com`;
  }

  /**
   * Gets the brand API URL.
   *
   * @returns {string}
   */
  get brandUrl() {
    return `${this.url}/webservices/rest/brand/${this.brand}`;
  }

  /**
   * Gets the root API URL.
   *
   * @returns {string}
   */
  get url() {
    return `https://${this.host}`;
  }

  /**
   * Performs a GET request against the brand API.
   *
   * @param {object} params
   * @param {string} params.endpoint
   */
  get({ endpoint } = {}) {
    return this.request({ method: 'GET', endpoint });
  }

  /**
   * Performs a request against the brand API.
   *
   * @param {object} params
   * @param {string} params.method The request method, e.g. GET or POST
   * @param {string} params.endpoint The brand endpoint
   * @param {object} [params.body] The request body object
   * @param {string} [params.inputId] An input ID to use. Overrides the default.
   * @returns {Promise<object>}
   */
  async request({
    method,
    endpoint,
    body,
    inputId,
  } = {}) {
    if (!endpoint) throw new Error('An API endpoint is required.');
    const url = `${this.brandUrl}/${cleanPath(endpoint)}`;

    const iid = inputId || this.inputId;
    const response = await fetch(url, {
      method,
      headers: {
        'x-omeda-appid': this.appId,
        ...(iid && { 'x-omeda-inputid': iid }),
        ...(body && { 'content-type': 'application/json' }),
      },
      ...(body && { body: JSON.stringify(body) }),
    });
    const data = await response.json();
    if (!response.ok) {
      const message = get(data, 'Errors.0.Error', response.statusText);
      const error = new Error(message);
      error.status = response.status || 500;
      error.data = data;
      error.response = response;
      throw error;
    }
    return { data, response };
  }
}

module.exports = OmedaApiClient;
