const build = require('../../schema/utils/build');
const schema = require('../../schema/brand/demographic-value-elements');

class BrandDemographicValueEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj }));
  }
}

module.exports = BrandDemographicValueEntity;
