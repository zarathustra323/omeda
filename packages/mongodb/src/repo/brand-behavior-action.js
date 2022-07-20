const SyncableRepo = require('./syncable');

class BrandBehaviorActionRepo extends SyncableRepo {
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
