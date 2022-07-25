const OmedaRepo = require('./abstract');

class BrandBehaviorActionRepo extends OmedaRepo {
  /**
   *
   */
  constructor({ brandKey, client, dbName } = {}) {
    super({
      brandKey,
      name: 'brand behavior action',
      collectionName: 'brand-behavior-actions',
      dbName,
      client,
    });
  }
}

module.exports = BrandBehaviorActionRepo;
