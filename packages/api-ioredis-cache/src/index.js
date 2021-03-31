const Redis = require('ioredis');
const OmedaApiCacheInterface = require('@parameter1/omeda-api-client/cache-interface');

class OmedaApiRedisCache extends OmedaApiCacheInterface {
  constructor({ settings, ...rest }) {
    super(...rest);
    this.redis = new Redis(settings);
  }

  async get(cacheKey) {
    return this.redis.get(cacheKey);
  }

  async set(cacheKey, responseData, ttl) {
    const secs = ttl || this.defaultTTL;
    return this.redis.set(cacheKey, JSON.stringify(responseData), 'EX', secs);
  }
}

module.exports = OmedaApiRedisCache;
