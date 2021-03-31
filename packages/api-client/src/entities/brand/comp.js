const build = require('../../schema/utils/build');
const schema = require('../../schema/brand/basic-elements');

class BrandComprehensiveEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj }));
  }
}

module.exports = BrandComprehensiveEntity;
