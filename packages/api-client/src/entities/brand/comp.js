const { asArray } = require('@parameter1/utils');
const build = require('../../schema/utils/build');
const schema = require('../../schema/brand/basic-elements');

const DemographicEntity = require('./demographic');

const builder = ({ name, value }) => {
  if (name === 'Demographics') {
    return asArray(value).map((obj) => new DemographicEntity(obj));
  }
  return null;
};

class BrandComprehensiveEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj, builder }));
  }
}

module.exports = BrandComprehensiveEntity;
