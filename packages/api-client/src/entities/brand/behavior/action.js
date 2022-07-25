const build = require('../../../schema/utils/build');
const schema = require('../../../schema/brand/behavior/action-elements');

class BrandBehaviorActionEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj }));
  }
}

module.exports = BrandBehaviorActionEntity;
