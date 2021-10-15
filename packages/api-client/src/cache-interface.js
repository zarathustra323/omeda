/* eslint-disable class-methods-use-this, no-unused-vars */
const { cleanPath } = require('@parameter1/utils');

class OmedaApiCacheInterface {
  /**
   *
   * @param {object} params
   * @param {number} [params.defaultTTL=3600] The default cache TTL, in seconds
   */
  constructor({ defaultTTL = 3600 } = {}) {
    this.defaultTTL = defaultTTL;
  }

  /**
   * Implement this in the extending cache class.
   *
   * @param {string} cacheKey The cache key to set.
   * @returns {object} An object containing the contentType and the body
   */
  async get(cacheKey) {
    throw new Error('The `get` method must be implemented in your cache class.');
  }

  /**
   * Implement this in the extending cache class.
   *
   * @param {string} cacheKey The cache key to use.
   * @param {string|object} body The API response body
   *                             (if JSON, should already be parsed to an object)
   * @param {number} [ttl] The TTL for this request, in seconds.
   * @param {string} [contentType=json] The response content type.
   */
  async set(cacheKey, body, ttl, contentType = 'json') {
    throw new Error('The `set` method must be implemented in your cache class.');
  }

  /**
   * Override this to create a different cache key.
   *
   * @param {object} params
   * @param {string} params.environment The API environment, e.g. production
   * @param {string} params.brand The API brand database
   * @param {string} params.operation The current operation, usually `brand`
   * @param {number} [params.ttl] The TTL of the specific request, in seconds.
   * @returns {string}
   */
  buildKey({
    environment,
    brand,
    operation,
    endpoint,
    ttl,
  } = {}) {
    const ttlPart = ttl || this.defaultTTL;
    const ep = cleanPath(endpoint).replace(/\//g, '-').replace(/-\*$/, '');
    return `omeda-api:${environment}:${operation}:${brand.toLowerCase()}:${ep}:${ttlPart}`;
  }
}

module.exports = OmedaApiCacheInterface;
