const Joi = require('@parameter1/joi');
const { validateAsync } = require('@parameter1/joi/utils');
const OmedaRepo = require('./abstract');

/**
 * Provides `upsert` and `status` methods to handle sync state.
 */
class SyncableRepo extends OmedaRepo {
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
    const data = await this.findById({ options });
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
   * @param {object[]} params.data The data to upsert.
   * @param {object[]} params.remove If the collection should be cleared of items not upserted.
   */
  async upsert(params = {}) {
    const { data, remove } = await validateAsync(Joi.object({
      data: Joi.array().items(Joi.object()).required(),
      remove: Joi.bool().default(true),
    }).required(), params);
    if (!data.length) return null;

    const { brandKey: brand } = this;
    const now = new Date();
    const ids = [];
    const operations = data.map((item) => {
      const { Id } = item;
      ids.push(Id);
      const filter = { brand, 'data.Id': Id };
      const update = {
        $setOnInsert: { brand, createdAt: now },
        $set: { data: item, updatedAt: now },
      };
      return { updateOne: { filter, update, upsert: true } };
    });

    // delete any remaining brand items that weren't included in this dataset
    if (remove) {
      operations.push({
        deleteMany: { filter: { 'data.Id': { $nin: ids }, brand } },
      });
    }

    return this.bulkWrite({ operations });
  }
}

module.exports = SyncableRepo;
