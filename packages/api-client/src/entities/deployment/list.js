const build = require('../../schema/utils/build');
const schema = require('../../schema/deployment/list-elements');

class DeploymentListEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj }));
  }
}

module.exports = DeploymentListEntity;
