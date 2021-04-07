const BrandRepo = require('./brand');
const BrandDemographicRepo = require('./brand-demographic');
const BrandDeploymentTypeRepo = require('./brand-deployment-type');
const BrandProductRepo = require('./brand-product');

module.exports = ({
  brandKey,
  client,
  dbName = 'omeda-api-data',
}) => {
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
