const { asArray } = require('@parameter1/utils');
const build = require('../../schema/utils/build');
const schema = require('../../schema/brand/product-elements');

const Issue = require('./product/issue');
const MarketingClass = require('./product/marketing-class');

const builder = ({ name, value }) => {
  if (name === 'Issues') {
    return asArray(value).map((obj) => new Issue(obj));
  }
  if (name === 'MarketingClasses') {
    return asArray(value).map((obj) => new MarketingClass(obj));
  }
  return null;
};

class BrandProductEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj, builder }));
  }
}

module.exports = BrandProductEntity;
