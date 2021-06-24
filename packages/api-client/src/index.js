const { cleanPath } = require('@parameter1/utils');
const fetch = require('node-fetch');
const ApiClientResponse = require('./response/client');
const ApiResponseError = require('./response/error');
const BrandResource = require('./resources/brand');
const CustomerResource = require('./resources/customer');
const EmailResource = require('./resources/email');
const pkg = require('../package.json');

class OmedaApiClient {
  /**
   *
   * @param {object} params
   * @param {string} params.appId The Omeda API app ID. Required.
   * @param {string} params.brand The brand abbreviation. Required.
   * @param {string} [params.clientAbbrev] The client abbreviation. Required for certain API calls.
   * @param {string} [params.inputId] The Omeda API input ID. Required when doing write calls.
   * @param {string} [params.useStaging=false] Whether to use the staging API.
   * @param {OmedaApiCacheInterface} [params.cache] A response cache implementation.
   */
  constructor({
    appId,
    brand,
    clientAbbrev,
    inputId,
    useStaging = false,
    cache,
  } = {}) {
    if (!appId) throw new Error('The Omeda API App ID is required.');
    if (!brand) throw new Error('The Omeda brand abbreviation is required.');
    this.appId = appId;
    this.brand = brand;
    this.clientAbbrev = clientAbbrev;
    this.inputId = inputId;
    this.useStaging = useStaging;

    this.cache = cache;
    this.resources = {
      brand: new BrandResource({ client: this }),
      customer: new CustomerResource({ client: this }),
      email: new EmailResource({ client: this }),
    };
  }

  /**
   * Returns an API resource for the provided name.
   *
   * @param {*} name The resource name, e.g. `customer` or `brand`
   */
  resource(name) {
    const resource = this.resources[name];
    if (!resource) throw new Error(`No API resource found for '${name}'`);
    return resource;
  }

  /**
   * Gets the API environment. Either staging or production.
   *
   * @returns {string}
   */
  get environment() {
    return this.useStaging ? 'staging' : 'prodcution';
  }

  /**
   * Gets the API host name.
   *
   * @returns {string}
   */
  get host() {
    const root = this.environment === 'staging' ? 'omedastaging' : 'omeda';
    return `ows.${root}.com`;
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
   * Generates a brand API URL for the provided endpoint.
   *
   * @param {string} endpoint
   * @returns {string}
   */
  brandUrl(endpoint) {
    return `${this.url}/webservices/rest/brand/${this.brand}/${cleanPath(endpoint)}`;
  }

  /**
   * Generates a client API URL for the provided endpoint.
   *
   * @param {string} endpoint
   * @returns {string}
   */
  clientUrl(endpoint) {
    const { clientAbbrev } = this;
    if (!clientAbbrev) throw new Error('Unable to perform operation: no client abbreviation was set on the API client.');
    return `${this.url}/webservices/rest/client/${clientAbbrev}/${cleanPath(endpoint)}`;
  }

  /**
   * Performs a GET request against the brand API.
   *
   * @param {object} params
   * @param {string} params.endpoint The brand API endpoint
   * @param {boolean} [params.errorOnNotFound=true] Whether to error when a 404 is encountered
   * @param {boolean} [params.useClientUrl=false] Whether to use the client API URL.
   * @returns {Promise<ApiClientResponse>}
   */
  async get({
    endpoint,
    errorOnNotFound = true,
    useClientUrl = false,
    cache = true,
    ttl,
  } = {}) {
    const shouldCache = Boolean(cache && this.cache);
    if (!shouldCache) {
      return this.request({
        method: 'GET',
        endpoint,
        errorOnNotFound,
        useClientUrl,
      });
    }

    const start = process.hrtime();
    const cacheKey = this.buildCacheKey({ endpoint, ttl });
    const parsed = await this.cache.get(cacheKey);

    if (parsed) {
      const time = OmedaApiClient.calculateTime(start);
      return new ApiClientResponse({ json: parsed, fromCache: true, time });
    }

    const response = await this.request({
      method: 'GET',
      endpoint,
      errorOnNotFound,
      useClientUrl,
    });
    await this.cache.set(cacheKey, response.json, ttl);
    return response;
  }

  /**
   * Performs a POST request against the brand API.
   *
   * @param {object} params
   * @param {string} params.endpoint The brand API endpoint
   * @param {object} params.body The body/payload to send with the request.
   * @param {string} [params.inputId] An input ID to use. Overrides the default.
   * @param {boolean} [params.useClientUrl=false] Whether to use the client API URL.
   * @returns {Promise<ApiClientResponse>}
   */
  async post({
    endpoint,
    body,
    inputId,
    useClientUrl = false,
  } = {}) {
    return this.request({
      method: 'POST',
      endpoint,
      body,
      inputId,
      useClientUrl,
    });
  }

  /**
   * Performs a request against the brand API.
   *
   * @param {object} params
   * @param {string} params.method The request method, e.g. GET or POST
   * @param {string} params.endpoint The brand API endpoint
   * @param {object} [params.body] The request body object
   * @param {string} [params.inputId] An input ID to use. Overrides the default.
   * @param {boolean} [params.errorOnNotFound=true] Whether to error when a 404 is encountered
   * @param {boolean} [params.useClientUrl=false] Whether to use the client API URL.
   * @returns {Promise<ApiClientResponse>}
   */
  async request({
    method,
    endpoint,
    body,
    inputId,
    errorOnNotFound = true,
    useClientUrl = false,
  } = {}) {
    const start = process.hrtime();
    if (!endpoint) throw new Error('An API endpoint is required.');
    const url = useClientUrl ? this.clientUrl(endpoint) : this.brandUrl(endpoint);

    const iid = inputId || this.inputId;
    const response = await fetch(url, {
      method,
      headers: {
        'x-omeda-appid': this.appId,
        'user-agent': `${pkg.name} v${pkg.version} (+${pkg.homepage})`,
        ...(iid && { 'x-omeda-inputid': iid }),
        ...(body && { 'content-type': 'application/json' }),
      },
      ...(body && { body: JSON.stringify(body) }),
    });
    const json = await response.json();
    const time = OmedaApiClient.calculateTime(start);
    if (response.ok) return new ApiClientResponse({ json, fetchResponse: response, time });

    if (errorOnNotFound === false && response.status === 404) {
      return new ApiClientResponse({ json: {}, fetchResponse: response, time });
    }
    throw new ApiResponseError({ json, fetchResponse: response, time });
  }

  /**
   * Builds a cache key for the provided operation and endpoint.
   *
   * @param {object} params
   * @param {string} params.endpoint
   * @param {string} [params.operation=brand]
   * @param {number} [params.ttl]
   * @returns
   */
  buildCacheKey({ endpoint, operation = 'brand', ttl } = {}) {
    return this.cache.buildKey({
      environment: this.environment,
      brand: this.brand,
      operation,
      endpoint,
      ttl,
    });
  }

  /**
   * Calculates operation time, in milliseconds, for a provided hrtime start value.
   *
   * @param {*} start
   */
  static calculateTime(start) {
    const [secs, ns] = process.hrtime(start);
    return (secs * 1000) + (ns / 1000000);
  }
}

module.exports = OmedaApiClient;
