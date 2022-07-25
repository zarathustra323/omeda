const Joi = require('@parameter1/joi');
const { validateAsync } = require('@parameter1/joi/utils');

module.exports = async (params = {}) => {
  const { repo, data, remove } = await validateAsync(Joi.object({
    repo: Joi.object().required(),
    data: Joi.array().items(Joi.object()).required(),
    remove: Joi.bool().default(true),
  }).required(), params);
  if (!data.length) return null;

  const { brandKey: brand } = repo;
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

  return repo.bulkWrite({ operations });
};
