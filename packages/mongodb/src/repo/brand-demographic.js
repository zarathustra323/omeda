const Joi = require('@parameter1/joi');
const { validateAsync } = require('@parameter1/joi/utils');
const OmedaRepo = require('./abstract');

class BrandDemographicRepo extends OmedaRepo {
  /**
   *
   */
  constructor({ brandKey, client, dbName } = {}) {
    super({
      brandKey,
      name: 'brand demographic',
      collectionName: 'brand-demographics',
      dbName,
      client,
    });
  }

  async findById({ id, options } = {}) {
    const query = { 'data.Id': id, brand: this.brandKey };
    const doc = await this.findOne({ query, options });
    return doc ? doc.data : null;
  }

  async findValueById({ demographicId, valueId } = {}) {
    const pipeline = [];
    pipeline.push({ $match: { 'data.Id': demographicId, brand: this.brandKey } });
    pipeline.push({ $project: { values: '$data.DemographicValues' } });
    pipeline.push({ $unwind: '$values' });
    pipeline.push({ $match: { 'values.Id': valueId } });
    pipeline.push({ $replaceRoot: { newRoot: '$values' } });
    const cursor = await this.aggregate({ pipeline });
    const [result] = await cursor.toArray();
    return result;
  }

  /**
   *
   * @param {object} params
   * @param {string} params.brand The brand abbreviation.
   * @param {object[]} params.demographics The demographics to upsert.
   */
  async upsert(params = {}) {
    const { demographics } = await validateAsync(Joi.object({
      demographics: Joi.array().items(Joi.object().required()).required(),
    }).required(), params);
    if (!demographics.length) return null;

    const { brandKey: brand } = this;
    const now = new Date();
    const ids = [];
    const operations = demographics.map((demographic) => {
      const { Id } = demographic;
      ids.push(Id);
      const filter = { brand, 'data.Id': Id };
      const update = {
        $setOnInsert: { brand, createdAt: now },
        $set: { data: demographic, updatedAt: now },
      };
      return { updateOne: { filter, update, upsert: true } };
    });

    // delete any remaining demographics that weren't included in this dataset
    operations.push({
      deleteMany: { filter: { 'data.Id': { $nin: ids }, brand } },
    });

    return this.bulkWrite({ operations });
  }
}

module.exports = BrandDemographicRepo;
