const Joi = require('@parameter1/joi');
const { validateAsync } = require('@parameter1/joi/utils');
const OmedaRepo = require('./abstract');

class BrandBehaviorActionRepo extends OmedaRepo {
  /**
   *
   */
  constructor({ brandKey, client, dbName } = {}) {
    super({
      brandKey,
      name: 'brand behavior action',
      collectionName: 'brand-behavior-actions',
      dbName,
      client,
    });
  }

  /**
   * Returns the status of the data in the DB.
   * Data is considered fresh when it's still within it's TTL period.
   *
   * @param {object} params
   * @param {number} [params.ttl=60*60*1] The TTL, in seconds. Default one hour
   * @returns {Promise<boolen>}
   */
  async status(params = {}) {
    const { ttl } = await validateAsync(Joi.object({
      ttl: Joi.number().integer().min(60).default(60 * 60 * 1),
    }).required(), params);

    const options = { projection: { _id: 1, updatedAt: 1 } };
    const data = await this.findOne({}, { options });
    const status = { brand: this.brandKey, exists: false, isFresh: false };
    if (!data) return status;
    status.exists = true;
    const date = new Date(Date.now() - (ttl * 1000));
    if (data.updatedAt >= date) status.isFresh = true;
    return status;
  }

  /**
   *
   * @param {object} params
   * @param {string} params.brand The brand abbreviation.
   * @param {object[]} params.demographics The demographics to upsert.
   */
  async upsert(params = {}) {
    const { actions } = await validateAsync(Joi.object({
      actions: Joi.array().items(Joi.object().required()).required(),
    }).required(), params);
    if (!actions.length) return null;

    const { brandKey: brand } = this;
    const now = new Date();
    const ids = [];
    const operations = actions.map((action) => {
      const { Id } = action;
      ids.push(Id);
      const filter = { brand, 'data.Id': Id };
      const update = {
        $setOnInsert: { brand, createdAt: now },
        $set: { data: action, updatedAt: now },
      };
      return { updateOne: { filter, update, upsert: true } };
    });

    // delete any remaining actions that weren't included in this dataset
    operations.push({
      deleteMany: { filter: { 'data.Id': { $nin: ids }, brand } },
    });

    return this.bulkWrite({ operations });
  }
}

module.exports = BrandBehaviorActionRepo;
