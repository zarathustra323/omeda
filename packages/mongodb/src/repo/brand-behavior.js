const OmedaRepo = require('./abstract');

class BrandBehaviorRepo extends OmedaRepo {
  /**
   *
   */
  constructor({ brandKey, client, dbName } = {}) {
    super({
      brandKey,
      name: 'brand behavior',
      collectionName: 'brand-behaviors',
      dbName,
      client,
    });
  }
}

module.exports = BrandBehaviorRepo;
