const BrandRepo = require('./brand');
const BrandDemographicRepo = require('./brand-demographic');

module.exports = ({ client, dbName = 'omeda-api-data' }) => {
  const brand = new BrandRepo({ client, dbName });
  const brandDemographic = new BrandDemographicRepo({ client, dbName });

  return {
    brand,
    brandDemographic,
  };
};
