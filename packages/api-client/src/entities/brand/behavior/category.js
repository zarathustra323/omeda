const build = require('../../../schema/utils/build');
const schema = require('../../../schema/brand/behavior/category-elements');

class BrandBehaviorCategoryEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj }));
  }
}

module.exports = BrandBehaviorCategoryEntity;
