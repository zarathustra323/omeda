const BrandRepo = require('./brand');
const BrandDemographicRepo = require('./brand-demographic');
const BrandDeploymentTypeRepo = require('./brand-deployment-type');
const BrandProductRepo = require('./brand-product');

module.exports = ({ client, dbName = 'omeda-api-data' }) => {
  const brandDemographic = new BrandDemographicRepo({ client, dbName });
  const brandDeploymentType = new BrandDeploymentTypeRepo({ client, dbName });
  const brandProduct = new BrandProductRepo({ client, dbName });
  const brand = new BrandRepo({
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
