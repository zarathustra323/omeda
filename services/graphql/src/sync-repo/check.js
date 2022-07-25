const Joi = require('@parameter1/joi');
const { validateAsync } = require('@parameter1/joi/utils');

module.exports = async (params = {}) => {
  const { repo, ttl } = await validateAsync(Joi.object({
    repo: Joi.object().required(),
    ttl: Joi.number().integer().min(60).default(60 * 60 * 1),
  }).required(), params);

  const options = { projection: { _id: 1, updatedAt: 1 } };
  const data = await repo.findById({ options });
  const status = { brand: repo.brandKey, exists: false, isFresh: false };
  if (!data) return status;
  status.exists = true;
  const date = new Date(Date.now() - (ttl * 1000));
  if (data.updatedAt >= date) status.isFresh = true;
  return status;
};
