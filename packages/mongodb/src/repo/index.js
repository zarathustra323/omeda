const BrandRepo = require('./brand');
const BrandDemographicRepo = require('./brand-demographic');

module.exports = ({ client, dbName = 'omeda-api-data' }) => {
  const brandDemographic = new BrandDemographicRepo({ client, dbName });
  const brand = new BrandRepo({ client, dbName, demographicRepo: brandDemographic });
  return {
    brand,
    brandDemographic,
  };
};
