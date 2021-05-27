const build = require('../../schema/utils/build');
const schema = require('../../schema/deployment/split-elements');

class EmailDeploymentSplitEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj }));
  }
}

module.exports = EmailDeploymentSplitEntity;
