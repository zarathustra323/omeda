const Joi = require('@parameter1/joi');
const { validateAsync } = require('@parameter1/joi/utils');
const upsert = require('./upsert');

module.exports = async (params = {}) => {
  const { repo, data } = await validateAsync(Joi.object({
    repo: Joi.object().required(),
    data: Joi.object().required(),
  }).required(), params);

  const { brandKey: brand } = repo;
  const now = new Date();
  const query = { brand };
  const toUpsert = ['Id', 'Description', 'BrandAbbrev', 'CustomerCount', 'ContactTypes'].reduce((o, key) => ({ ...o, [key]: data[key] }), {});
  const update = {
    $setOnInsert: { ...query, createdAt: now },
    $set: { data: toUpsert, updatedAt: now },
  };
  return Promise.all([
    repo.updateOne({ query, update, options: { upsert: true } }),
    upsert({ repo: repo.demographicRepo, data: data.Demographics }),
    upsert({ repo: repo.deploymentTypeRepo, data: data.DeploymentTypes }),
    upsert({ repo: repo.productRepo, data: data.Products }),
  ]);
};
