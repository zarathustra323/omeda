const SyncableRepo = require('./syncable');

class BrandBehaviorCategoryRepo extends SyncableRepo {
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
