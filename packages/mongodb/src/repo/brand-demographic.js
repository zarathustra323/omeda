const { Repo } = require('@parameter1/mongodb/repo');
const Joi = require('@parameter1/joi');
const { validateAsync } = require('@parameter1/joi/utils');

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

  /**
   *
   * @param {object} params
   * @param {string} params.brand The brand abbreviation.
   * @param {object[]} params.demographics The demographics to upsert.
   */
  async upsert(params = {}) {
    const { brand, demographics } = await validateAsync(Joi.object({
      brand: Joi.string().lowercase().trim().required(),
      demographics: Joi.array().items(Joi.object().required()).required(),
    }).required(), params);
    if (!demographics.length) return null;

    const now = new Date();
    const ids = [];
    const operations = demographics.map((demographic) => {
      const { Id } = demographic;
      ids.push(Id);
      const filter = { _id: Id, brand };
      const update = {
        $setOnInsert: { ...filter, createdAt: now },
        $set: { data: demographic, updatedAt: now },
      };
      return { updateOne: { filter, update, upsert: true } };
    });

    // delete any remaining demographics that weren't included in this dataset
    operations.push({
      deleteMany: { filter: { _id: { $nin: ids }, brand } },
    });

    return this.bulkWrite({ operations });
  }
}

module.exports = BrandDemographicRepo;
