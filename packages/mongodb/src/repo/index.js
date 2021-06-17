const Joi = require('@parameter1/joi');
const BrandRepo = require('./brand');
const BrandDemographicRepo = require('./brand-demographic');
const BrandDeploymentTypeRepo = require('./brand-deployment-type');
const BrandProductRepo = require('./brand-product');

module.exports = (params = {}) => {
  const { value, error } = Joi.object({
    brandKey: Joi.string().trim().lowercase().required(),
    client: Joi.object().required(),
    dbName: Joi.string().trim().default('omeda-api-data'),
  }).validate(params);
  const { brandKey, client, dbName } = value;
  if (error) throw new Error(error.details[0].message);
  const brandDemographic = new BrandDemographicRepo({ brandKey, client, dbName });
  const brandDeploymentType = new BrandDeploymentTypeRepo({ brandKey, client, dbName });
  const brandProduct = new BrandProductRepo({ brandKey, client, dbName });
  const brand = new BrandRepo({
    brandKey,
    client,
    dbName,
    demographicRepo: brandDemographic,
    productRepo: brandProduct,
    deploymentTypeRepo: brandDeploymentType,
  });
  return {
    brand,
    brandDemographic,
    brandDeploymentType,
    brandProduct,
  };
};
