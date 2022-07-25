const build = require('../../../schema/utils/build');
const schema = require('../../../schema/brand/behavior/attribute-elements');

class BrandBehaviorAttributeEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj }));
  }
}

module.exports = BrandBehaviorAttributeEntity;
