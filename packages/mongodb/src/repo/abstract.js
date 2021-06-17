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

  async findById({ id, options } = {}) {
    return this.findOne({
      query: { 'data.Id': id },
      options,
    });
  }

  async findOne({ query, options }) {
    return super.findOne({
      query: { ...query, brand: this.brandKey },
      options,
    });
  }

  async find({ query, options } = {}) {
    return super.find({
      query: { ...query, brand: this.brandKey },
      options,
    });
  }

  async distinct({ key, query, options } = {}) {
    return super.distinct({
      key,
      query: { ...query, brand: this.brandKey },
      options,
    });
  }

  async countDocuments({ query, options } = {}) {
    return super.countDocuments({
      query: { ...query, brand: this.brandKey },
      options,
    });
  }
}

module.exports = OmedaRepo;
