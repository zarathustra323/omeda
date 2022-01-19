const build = require('../../../schema/utils/build');
const schema = require('../../../schema/brand/product/marketing-class-elements');

class BrandProductMarketingClassEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj }));
  }
}

module.exports = BrandProductMarketingClassEntity;
