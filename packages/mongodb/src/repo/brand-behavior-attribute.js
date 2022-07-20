const SyncableRepo = require('./syncable');

class BrandBehaviorAttributeRepo extends SyncableRepo {
  /**
   *
   */
  constructor({ brandKey, client, dbName } = {}) {
    super({
      brandKey,
      name: 'brand behavior attribute',
      collectionName: 'brand-behavior-attributes',
      dbName,
      client,
    });
  }
}

module.exports = BrandBehaviorAttributeRepo;
