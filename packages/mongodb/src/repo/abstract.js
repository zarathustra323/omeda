const { Repo } = require('@parameter1/mongodb/repo');

class OmedaRepo extends Repo {
  /**
   *
   */
  constructor({
    brandKey,
    name,
    collectionName,
    client,
    dbName,
  } = {}) {
    if (!brandKey) throw new Error('A brand key is required.');
    super({
      name,
      collectionName,
      dbName,
      client,
    });
    this.brandKey = brandKey;
  }
}

module.exports = OmedaRepo;
