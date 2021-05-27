const build = require('../../schema/utils/build');
const schema = require('../../schema/deployment/tester-elements');

class EmailDeploymentTesterEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj }));
  }
}

module.exports = EmailDeploymentTesterEntity;
