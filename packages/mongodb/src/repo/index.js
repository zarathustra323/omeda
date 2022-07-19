const Joi = require('@parameter1/joi');
const ApiRequestRepo = require('./api-request');
const BrandRepo = require('./brand');
const BrandBehaviorActionRepo = require('./brand-behavior-action');
const BrandDemographicRepo = require('./brand-demographic');
const EmailDeploymentRepo = require('./email-deployment');
const BrandDeploymentTypeRepo = require('./brand-deployment-type');
const BrandProductRepo = require('./brand-product');
const CustomerRepo = require('./customer');

module.exports = (params = {}) => {
  const { value, error } = Joi.object({
    brandKey: Joi.string().trim().lowercase().required(),
    client: Joi.object().required(),
    dbName: Joi.string().trim().default('omeda-api-data'),
  }).validate(params);
  const { brandKey, client, dbName } = value;
  if (error) throw new Error(error.details[0].message);
  const apiRequest = new ApiRequestRepo({ brandKey, client, dbName });
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
    apiRequest,
    brand,
    brandBehaviorAction: new BrandBehaviorActionRepo({ brandKey, client, dbName }),
    brandDemographic,
    brandDeploymentType,
    brandProduct,
    customer: new CustomerRepo({ brandKey, client, dbName }),
    emailDeployment: new EmailDeploymentRepo({ brandKey, client, dbName }),
  };
};
