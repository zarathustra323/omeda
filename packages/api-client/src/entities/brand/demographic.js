const { asArray } = require('@parameter1/utils');
const build = require('../../schema/utils/build');
const schema = require('../../schema/brand/demographic-elements');

const DemographicValue = require('./demographic-value');

const builder = ({ name, value, parent }) => {
  if (name === 'DemographicValues') {
    // force an empty array for non-choice demographics.
    // the Omeda API returns an array with a single value object, containing
    // an Id of 0 (which is invalid)
    if (![1, 2].includes(parent.DemographicType)) return [];
    return asArray(value).map((obj) => new DemographicValue(obj));
  }
  return null;
};

class BrandDemographicEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj, builder }));
  }
}

module.exports = BrandDemographicEntity;
