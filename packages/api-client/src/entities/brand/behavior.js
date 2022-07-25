const build = require('../../schema/utils/build');
const schema = require('../../schema/brand/behavior/behavior-elements');

class BrandBehaviorEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj }));
  }
}

module.exports = BrandBehaviorEntity;
