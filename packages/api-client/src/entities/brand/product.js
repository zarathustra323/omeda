const build = require('../../schema/utils/build');
const schema = require('../../schema/brand/product-elements');

class BrandProductEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj }));
  }
}

module.exports = BrandProductEntity;
