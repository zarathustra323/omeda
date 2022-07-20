const SyncableRepo = require('./syncable');

class BrandBehaviorRepo extends SyncableRepo {
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
