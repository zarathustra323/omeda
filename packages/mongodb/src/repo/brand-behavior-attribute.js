const OmedaRepo = require('./abstract');

class BrandBehaviorAttributeRepo extends OmedaRepo {
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
