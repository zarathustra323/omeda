const OmedaRepo = require('./abstract');

class BrandProductRepo extends OmedaRepo {
  /**
   *
   */
  constructor({ brandKey, client, dbName } = {}) {
    super({
      brandKey,
      name: 'brand product',
      collectionName: 'brand-products',
      dbName,
      client,
    });
  }
}

module.exports = BrandProductRepo;
