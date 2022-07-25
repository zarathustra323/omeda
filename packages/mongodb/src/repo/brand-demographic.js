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
}

module.exports = BrandDemographicRepo;
