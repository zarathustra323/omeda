const build = require('../../schema/utils/build');
const schema = require('../../schema/brand/demographic-value-elements');

const DemographicValueType = require('../../types-and-codes/demographic-value-type');

const builder = ({ name, value }) => {
  if (name === 'DemographicValueType') return new DemographicValueType(value);
  return null;
};

class BrandDemographicValueEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj, builder }));
  }
}

module.exports = BrandDemographicValueEntity;
