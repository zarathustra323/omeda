const { asArray } = require('@parameter1/utils');
const build = require('../../schema/utils/build');
const schema = require('../../schema/brand/basic-elements');

const DemographicEntity = require('./demographic');
const DeploymentType = require('./deployment-type');
const ProductEntity = require('./product');

const builder = ({ name, value }) => {
  if (name === 'Products') {
    return asArray(value).map((obj) => new ProductEntity(obj));
  }
  if (name === 'Demographics') {
    return asArray(value).map((obj) => new DemographicEntity(obj));
  }
  if (name === 'DeploymentTypes') {
    return asArray(value).map((obj) => new DeploymentType(obj));
  }
  return null;
};

class BrandComprehensiveEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj, builder }));
  }
}

module.exports = BrandComprehensiveEntity;
