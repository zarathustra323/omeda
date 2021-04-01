const { Repo } = require('@parameter1/mongodb/repo');

class BrandDemographicRepo extends Repo {
  /**
   *
   */
  constructor({ client, dbName } = {}) {
    super({
      name: 'brand demographic',
      collectionName: 'brand-demographics',
      dbName,
      client,
    });
  }
}

module.exports = BrandDemographicRepo;
