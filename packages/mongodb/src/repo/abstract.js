const { Repo } = require('@parameter1/mongodb/repo');
const { find } = require('@parameter1/graphql-mongodb-pagination');
const { get } = require('@parameter1/utils');

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
    collatableFields = [],
  } = {}) {
    if (!brandKey) throw new Error('A brand key is required.');
    super({
      name,
      collectionName,
      dbName,
      client,
    });
    this.brandKey = brandKey.toLowerCase();
    this.collatableFields = Array.isArray(collatableFields)
      ? collatableFields.reduce((o, field) => ({ ...o, [field]: true }), {})
      : {};
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

  /**
   * @param {object} params
   */
  async paginate({
    query,
    limit,
    skip,
    after,
    sort,
    projection,
    excludeProjection,
    additionalData,
  } = {}) {
    const collection = await this.collection();
    const sortField = get(sort, 'field');
    return find(collection, {
      query: { ...query, brand: this.brandKey },
      limit,
      skip,
      after,
      sort,
      projection,
      excludeProjection,
      collate: this.collatableFields[sortField],
      additionalData,
    });
  }
}

module.exports = OmedaRepo;
