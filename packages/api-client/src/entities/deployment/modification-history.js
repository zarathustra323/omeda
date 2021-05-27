const build = require('../../schema/utils/build');
const schema = require('../../schema/deployment/modification-history-elements');

class EmailDeploymentModificationHistoryEntity {
  constructor(obj) {
    Object.assign(this, build({ schema, obj }));
  }
}

module.exports = EmailDeploymentModificationHistoryEntity;
