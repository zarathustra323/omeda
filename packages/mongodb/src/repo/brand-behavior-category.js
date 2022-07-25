const OmedaRepo = require('./abstract');

class BrandBehaviorCategoryRepo extends OmedaRepo {
  /**
   *
   */
  constructor({ brandKey, client, dbName } = {}) {
    super({
      brandKey,
      name: 'brand behavior category',
      collectionName: 'brand-behavior-categories',
      dbName,
      client,
    });
  }
}

module.exports = BrandBehaviorCategoryRepo;
