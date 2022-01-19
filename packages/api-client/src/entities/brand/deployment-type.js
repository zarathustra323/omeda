const build = require('../../schema/utils/build');
const schema = require('../../schema/brand/deployment-type-elements');

class BrandDeploymentTypeEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj }));
  }
}

module.exports = BrandDeploymentTypeEntity;
