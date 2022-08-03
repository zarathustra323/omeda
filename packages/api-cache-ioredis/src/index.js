const Redis = require('ioredis');
const OmedaApiCacheInterface = require('@parameter1/omeda-api-client/cache-interface');

class OmedaApiRedisCache extends OmedaApiCacheInterface {
  constructor({ settings, ...rest }) {
    super({ ...rest });
    this.redis = new Redis(settings);
  }

  /**
   *
   * @param {string} cacheKey The cache key to set.
   * @returns {object} An object containing the contentType and the body
   */
  async get(cacheKey) {
    const json = await this.redis.get(cacheKey);
    if (!json) return null;
    return JSON.parse(json);
  }

  /**
   *
   * @param {string} cacheKey The cache key to use.
   * @param {string|object} body The API response body
   *                             (if JSON, should already be parsed to an object)
   * @param {number} [ttl] The TTL for this request, in seconds.
   * @param {string} [contentType=json] The response content type.
   */
  async set(cacheKey, body, ttl, contentType = 'json') {
    const secs = ttl || this.defaultTTL;
    return this.redis.set(cacheKey, JSON.stringify({ contentType, body }), 'EX', secs);
  }
}

module.exports = OmedaApiRedisCache;
