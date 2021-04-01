const { Repo } = require('@parameter1/mongodb/repo');

class BrandRepo extends Repo {
  /**
   *
   */
  constructor({ client, dbName } = {}) {
    super({
      name: 'brand',
      collectionName: 'brands',
      dbName,
      client,
    });
  }
}

module.exports = BrandRepo;
