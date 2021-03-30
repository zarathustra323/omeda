const { cleanPath } = require('@parameter1/utils');
const fetch = require('node-fetch');
const OmedaApiClientResponse = require('./response/client');
const OmedaApiResponseError = require('./response/error');
const CustomerResource = require('./resources/customer');
const pkg = require('../package.json');

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
   * @returns {Promise<OmedaApiClientResponse>}
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
   * @returns {Promise<OmedaApiClientResponse>}
   */
  async request({
    method,
    endpoint,
    body,
    inputId,
  } = {}) {
    const start = process.hrtime();
    if (!endpoint) throw new Error('An API endpoint is required.');
    const url = `${this.brandUrl}/${cleanPath(endpoint)}`;

    const iid = inputId || this.inputId;
    const response = await fetch(url, {
      method,
      headers: {
        'x-omeda-appid': this.appId,
        'user-agent': `${pkg.name} v${pkg.version}`,
        ...(iid && { 'x-omeda-inputid': iid }),
        ...(body && { 'content-type': 'application/json' }),
      },
      ...(body && { body: JSON.stringify(body) }),
    });
    const json = await response.json();
    if (!response.ok) {
      throw new OmedaApiResponseError({ json, fetchResponse: response });
    }
    const [secs, ns] = process.hrtime(start);
    const time = (secs * 1000) + (ns / 1000000);
    return new OmedaApiClientResponse({ json, fetchResponse: response, time });
  }
}

module.exports = OmedaApiClient;
